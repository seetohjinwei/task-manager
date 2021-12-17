import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import IUser from "./interfaces/InterfaceUser";
import Logout from "./auth/Logout";
import Search from "./Search";
import Tasks from "./Tasks";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [tasks, setTasks] = useState<ITask[]>([]);
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
    // fetch tasks from database
    axios
      .get("http://localhost:3000/tasks", { withCredentials: true })
      .then((response) => {
        if (response.status !== 200) {
          console.log("error");
        } else {
          // console.log(response.data.tasks);
          // console.log(response.data.tasks[0].tags);
          setTasks(response.data.tasks);
        }
      })
      .catch((error) => console.log(error));
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
