import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import IUser from "./interfaces/InterfaceUser";
import Logout from "./auth/Logout";
import Search from "./Search";
import Tasks from "./Tasks";
import React, { useEffect, useState } from "react";

// temporary testing tasks
const initialTasks: ITask[] = [
  {
    id: 0,
    name: "Task 1",
    description: "Hello world!",
    tags: ["school", "personal"],
    isDone: false,
  },
  {
    id: 1,
    name: "Find the answer to the problem.",
    description: "Hello Universe!",
    tags: ["empty", "universal threat"],
    isDone: true,
  },
  {
    id: 2,
    name: "Finish this task manager!",
    description: "Hopefully sooner rather than later!",
    tags: ["assignments"],
    deadline: "December 25, 2021",
    isDone: false,
  },
  {
    id: 3,
    name: "Another generic task!",
    description: "",
    tags: ["tasks"],
    isDone: true,
  },
  {
    id: 4,
    name: "Yet another one!",
    description: "5th guy!",
    tags: ["assignments"],
    isDone: false,
  },
  {
    id: 5,
    name: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    tags: [],
    isDone: false,
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

const Dashboard = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);
  const [searchProps, setSearchProps] = useState<ISearch>(initSearchProps);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const welcomeMessages = [
    // prefix + username + postfix
    ["Hello ", "!"],
    ["Yo ", "!"],
    ["Hi ya ", "!"],
    ["Hey there, ", "!"],
    ["", ", welcome!"],
    ["Your tasks, ", "."],
    ["<username>", "</username>"],
    ["You're back, ", "!"],
  ];
  useEffect(() => {
    // randomise welcome message on page load
    const index = Math.floor(Math.random() * welcomeMessages.length);
    setWelcomeMessage(welcomeMessages[index][0] + userDetails.username + welcomeMessages[index][1]);
  }, []);

  return (
    <div className="m-5">
      <h1>{welcomeMessage}</h1>
      <Search {...{ searchProps, setSearchProps }} />
      <Logout {...{ userDetails, setUserDetails }} />
      <Tasks {...{ tasks, searchProps }} />
    </div>
  );
};

export default Dashboard;
