import ITask from "./InterfaceTask";
import React from "react";

// TODO: task renders if does NOT match searchString
// TODO: exception for empty searchString

const Task = ({
  task,
  searchString,
}: {
  task: ITask;
  searchString: string;
}) => {
  // console.log(task);
  return (
    <div>
      <p>{task.name}</p>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
