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
    isDone: false,
    isChild: false,
    children: [],
  },
  {
    id: 1,
    name: "Find the answer to the problem.",
    description: "Hello Universe!",
    tags: ["empty", "universal threat"],
    isDone: true,
    isChild: false,
    children: [],
  },
  {
    id: 2,
    name: "Finish this task manager!",
    description: "Hopefully sooner rather than later!",
    tags: ["assignments"],
    isDone: false,
    isChild: false,
    children: [],
  },
];
const initSearchProps: ISearch = {
  searchString: "",
  displayDone: true,
  strictSearch: false,
};

// if ANY of the search string or search tags match, will display the task.
// search string is case insensitive
// tags are case sensitive

const Home = (): JSX.Element => {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);
  const [searchProps, setSearchProps] = useState<ISearch>(initSearchProps);

  return (
    <div>
      <Tasks {...{ tasks, searchProps }} />
      <Search {...{ searchProps, setSearchProps }} />
    </div>
  );
};

export default Home;
