import ITask from "./InterfaceTask";
import Task from "./Task";
import React from "react";

const Tasks = ({
  tasks,
  searchString,
}: {
  tasks: ITask[];
  searchString: string;
}) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={index} {...{ task, searchString }} />
      ))}
    </div>
  );
};

export default Tasks;
