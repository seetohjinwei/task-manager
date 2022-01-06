import { fetchDeleteTask, fetchUpdateTask } from "./Functions/Fetch";
import ITask from "./interfaces/InterfaceTask";
import IUser from "./interfaces/InterfaceUser";
import Task from "./Task";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import React from "react";

const Tasks = ({
  tasks,
  setTasks,
  searchString,
  userDetails,
}: {
  tasks: ITask[];
  searchString: string;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  userDetails: IUser;
}) => {
  const searchTerms: string[] = searchString.split(" ");

  /** Responsible for deciding if a task is to be rendered. */
  const render = (task: ITask, index: number) => {
    /** Checks if task matches a parameter. */
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

  /** Updates task in database and in local state. */
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
    fetchUpdateTask(
      newTask.id,
      subsetTask,
      (response) => {
        if (updateState) {
          const index: number = tasks.indexOf(originalTask);
          const tasksCopy: ITask[] = [...tasks];
          tasksCopy[index] = response.data.task;
          setTasks(tasksCopy);
        }
      },
      (error) => console.log("error", error)
    );
  };

  const deleteTask = (task: ITask) => {
    fetchDeleteTask(
      task.id,
      (response) => {
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
      },
      (error) => console.log("error", error)
    );
  };

  /** Sensors for @dnd-kit */
  const sensors = [useSensor(PointerSensor), useSensor(TouchSensor)];
  /** On drag ending, updates all tasks affected. */
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

  /** Grid of Tasks abstracted to be able to be passed sorted tasks. */
  const gridOfTasks = (tasks: ITask[]) => {
    return <div className="tasks-grid">{tasks.map((task, index) => render(task, index))}</div>;
  };

  /** Control flow based on sort_method */
  if (userDetails.sort_method === "default") {
    return (
      <DndContext
        autoScroll
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={dragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.posid.toString())}
          strategy={rectSortingStrategy}
        >
          {gridOfTasks(tasks)}
        </SortableContext>
      </DndContext>
    );
  } else if (userDetails.sort_method === "name") {
    return gridOfTasks([...tasks].sort((a, b) => a.name.localeCompare(b.name)));
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
  } else if (userDetails.sort_method === "tags") {
    return gridOfTasks(
      [...tasks].sort((a, b) => {
        const smallerLength = Math.min(a.tags.length, b.tags.length);
        for (let index = 0; index < smallerLength; index++) {
          const x = a.tags[index];
          const y = b.tags[index];
          if (x !== y) {
            return x.localeCompare(y);
          }
        }
        // tie break with number of tags
        if (a.tags.length < b.tags.length) {
          return 1;
        } else {
          return -1;
        }
      })
    );
  } else {
    // should not happen as sort_method is typed to only have those 3 possibilities.
    console.log("invalid sortMethod, fix in Tasks.tsx", userDetails.sort_method, userDetails);
    return null;
  }
};

export default Tasks;
