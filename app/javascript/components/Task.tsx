import ITask from "./InterfaceTask";
import React from "react";

const Task = (task: ITask) => {
  console.log(task);
  return (
    <div>
      <p>{task.name}</p>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
