import ISearch from "./InterfaceSearch";
import ITask from "./InterfaceTask";
import Search from "./Search";
import Tasks from "./Tasks";
import React, { useState } from "react";

// temporary testing tasks
const initialTasks: ITask[] = [
  {
    id: 0,
    name: "Task 1",
    description: "Hello world!",
    tags: ["school", "personal"],
    isChild: false,
    children: [],
  },
  {
    id: 1,
    name: "Find the answer to the problem.",
    description: "Hello Universe!",
    tags: ["empty", "universal threat"],
    isChild: false,
    children: [],
  },
  {
    id: 2,
    name: "Finish this task manager!",
    description: "Hopefully sooner rather than later!",
    tags: ["assignments"],
    isChild: false,
    children: [],
  },
];

const Home = (): JSX.Element => {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);
  const [searchString, setSearchString] = useState<string>("");
  const searchProp: ISearch = {
    searchString: searchString,
    setSearchString: setSearchString,
  };

  return (
    <div>
      <Tasks {...{ tasks, searchString }} />
      <Search {...searchProp} />
    </div>
  );
};

export default Home;
