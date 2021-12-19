import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import Task from "./Task";
import axios from "axios";
import React from "react";
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

const Tasks = ({
  tasks,
  setTasks,
  searchProps,
}: {
  tasks: ITask[];
  searchProps: ISearch;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) => {
  const searchString: string = searchProps.searchString;
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

    const passDisplayDone: boolean = searchProps.displayDone || !task.isdone;
    const passStrictSearch: boolean = searchProps.strictSearch
      ? searchTerms.every((searchParam) => matchParam(searchParam, true))
      : searchTerms.some((searchParam) => matchParam(searchParam, false));

    return (
      passDisplayDone &&
      passStrictSearch && <Task key={index} {...{ task, updateTask, deleteTask }} />
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
      .patch(`http://localhost:3000/tasks/${newTask.id}`, subsetTask, { withCredentials: true })
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
      .delete(`http://localhost:3000/tasks/${task.id}`, { withCredentials: true })
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

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={dragEnd}>
      <SortableContext
        items={tasks.map((task) => task.posid.toString())}
        strategy={rectSortingStrategy}
      >
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
      </SortableContext>
    </DndContext>
  );
};

export default Tasks;
