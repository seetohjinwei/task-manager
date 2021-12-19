import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import Task from "./Task";
import axios from "axios";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
// import GridLayout from "react-grid-layout"
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Tasks = ({
  tasks,
  setTasks,
  searchProps,
  loadTasks,
}: {
  tasks: ITask[];
  searchProps: ISearch;
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
  loadTasks: () => void;
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
      passStrictSearch && (
        // renders however many tasks on 1 row
        // TODO: DRAG
        <Draggable key={task.posid} draggableId={"draggable-" + task.posid} index={index}>
          {(provided, snapshot) => (
            <Col
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3"
              key={index}
            >
              <p {...provided.dragHandleProps}>DRAG HERE</p>
              <Task {...{ task, updateTask, deleteTask }} />
            </Col>
          )}
        </Draggable>
      )
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
          // decrement posid of everything after deleted task
          for (let i = index; i < tasksCopy.length; i++) {
            const originalTask = tasksCopy[i];
            const newTask: ITask = { ...originalTask };
            newTask.posid--;
            // don't update state (I think it was causing race condition)
            // update in one action instead
            updateTask(originalTask, newTask, false);
          }
          setTasks(tasksCopy);
        } else {
          console.log("error!", response);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const dragEnd = (result) => {};

  return (
    <DragDropContext onDragEnd={dragEnd}>
      {/* g-3 gutters (spacing between grid elements) */}
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <Row className="g-3">{tasks.map((task, index) => render(task, index))}</Row>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Tasks;
