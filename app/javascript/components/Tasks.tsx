import ITask from "./interfaces/InterfaceTask";
import Task from "./Task";
import axios from "axios";
import React from "react";
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import IUser from "./interfaces/InterfaceUser";

const Tasks = ({
  tasks,
  setTasks,
  searchString,
  userDetails,
  setUserDetails,
}: {
  tasks: ITask[];
  searchString: string;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const searchTerms: string[] = searchString.split(" ");

  const render = (task: ITask, index: number) => {
    const matchParam = (searchParam: string, strict: boolean): boolean => {
      if (strict && searchString !== "" && searchParam === "") {
        // if strict search ON
        return true;
      } else if (!strict && searchString !== "" && searchParam === "") {
        // if strict search OFF
        return false;
      } else {
        const lowerCaseSearchParam: string = searchParam.toLowerCase();
        return (
          (searchParam.startsWith("#") && task.tags.join(" ").includes(searchParam.slice(1))) ||
          task.name.toLowerCase().includes(lowerCaseSearchParam) ||
          task.description.toLowerCase().includes(lowerCaseSearchParam)
        );
      }
    };

    const passDisplayDone: boolean = userDetails.display_done || !task.isdone;
    const passStrictSearch: boolean = userDetails.strict_search
      ? searchTerms.every((searchParam) => matchParam(searchParam, true))
      : searchTerms.some((searchParam) => matchParam(searchParam, false));

    const draggable = userDetails.sort_method === "default";

    return (
      passDisplayDone &&
      passStrictSearch && <Task key={index} {...{ task, updateTask, deleteTask, draggable }} />
    );
  };

  const updateTask = (
    originalTask: ITask,
    newTask: {
      id: number;
      posid?: number;
      name?: string;
      description?: string;
      tags?: string[];
      deadline?: string;
      isdone?: boolean;
    },
    updateState: boolean = true
  ) => {
    // ignore created_at, updated_at (never want to change them manually) -- postgres changes automatically
    const { posid, name, description, tags, deadline, isdone, ...rest } = newTask;
    const subsetTask = { posid, name, description, tags, deadline, isdone };
    axios
      .patch(`https://jinwei-task-manager.herokuapp.com/tasks/${newTask.id}`, subsetTask, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          if (updateState) {
            const index: number = tasks.indexOf(originalTask);
            const tasksCopy: ITask[] = [...tasks];
            tasksCopy[index] = response.data.task;
            setTasks(tasksCopy);
          }
        } else {
          console.log("error!", response);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const deleteTask = (task: ITask) => {
    axios
      .delete(`https://jinwei-task-manager.herokuapp.com/tasks/${task.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const index: number = tasks.indexOf(task);
          const tasksCopy: ITask[] = [...tasks];
          tasksCopy.splice(index, 1);
          for (let i = index; i < tasksCopy.length; i++) {
            // decrement posid of everything after deleted task
            const originalTask: ITask = { ...tasksCopy[i] };
            tasksCopy[i].posid--;
            updateTask(originalTask, tasksCopy[i], false);
          }
          setTasks(tasksCopy);
        } else {
          console.log("error!", response);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const sensors = [useSensor(PointerSensor)];
  const dragEnd = (event: DragEndEvent) => {
    if (event.active.id !== event.over.id) {
      const startID = parseInt(event.active.id);
      const endID = parseInt(event.over.id);
      const tasksCopy = arrayMove(tasks, startID, endID);
      for (let i = Math.min(startID, endID); i <= Math.max(startID, endID); i++) {
        // updating posid of everything affected by the drag
        const originalTask: ITask = { ...tasksCopy[i] };
        tasksCopy[i].posid = i;
        updateTask(originalTask, tasksCopy[i], false);
      }
      setTasks(tasksCopy);
    }
  };

  const gridOfTasks = (tasks: ITask[]) => {
    return (
      <div
        style={{
          display: "grid",
          // dynamically changes how many tasks can fit in 1 row
          gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
          gridGap: 10,
          padding: 10,
        }}
      >
        {tasks.map((task, index) => render(task, index))}
      </div>
    );
  };

  if (userDetails.sort_method === "default") {
    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEnd}>
        <SortableContext
          items={tasks.map((task) => task.posid.toString())}
          strategy={rectSortingStrategy}
        >
          {gridOfTasks(tasks)}
        </SortableContext>
      </DndContext>
    );
  } else if (userDetails.sort_method === "deadline") {
    return gridOfTasks(
      [...tasks].sort((a, b) => {
        // if a task has no deadline, it always appears at the back
        if (b.deadline === "") {
          return -1;
        } else if (a.deadline === "") {
          return 1;
        } else {
          // workaround because browsers lets you key in more than 4 digits for year
          // Firefox can do 5, Chrome/Safari can do 6, this workaround works for 8 digit years.
          if (a.deadline.length > 10) {
            console.log(`Didn't know this site would be used in ${a.deadline.split("-")[0]}!`);
          }
          const deadlineA = a.deadline.padStart(14, "0");
          const deadlineB = b.deadline.padStart(14, "0");
          return deadlineA.localeCompare(deadlineB);
        }
      })
    );
  } else if (userDetails.sort_method === "alphabetical") {
    return gridOfTasks([...tasks].sort((a, b) => a.name.localeCompare(b.name)));
  } else {
    console.log("invalid sortMethod", userDetails);
    return null;
  }
};

export default Tasks;
