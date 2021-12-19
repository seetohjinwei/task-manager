import { TaskAdder } from "./Functions/TaskFunctions";
import ISearch from "./interfaces/InterfaceSearch";
import ITask from "./interfaces/InterfaceTask";
import IUser from "./interfaces/InterfaceUser";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import NavigationBar from "./NavigationBar";
import Row from "react-bootstrap/Row";
import Search from "./Search";
import Tasks from "./Tasks";

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
  const [showAddModal, setShowAddModal] = useState(false);
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
    // randomise welcome message on page load (or userDetails change)
    const index = Math.floor(Math.random() * welcomeMessages.length);
    setWelcomeMessage(welcomeMessages[index][0] + userDetails.username + welcomeMessages[index][1]);
  }, [userDetails]);
  const loadTasks = () => {
    // fetch tasks from database
    axios
      .get("http://localhost:3000/tasks", { withCredentials: true })
      .then((response) => {
        if (response.status !== 200) {
          console.log("error");
        } else {
          setTasks(response.data.tasks);
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(loadTasks, []);

  return (
    <div>
      <NavigationBar {...{ userDetails, setUserDetails }} />
      <TaskAdder {...{ showAddModal, setShowAddModal, tasks, setTasks }} />
      <div className="m-5">
        <Row>
          <Col className="col-2"></Col>
          <Col>
            <h1>{welcomeMessage}</h1>
            <Search {...{ searchProps, setSearchProps }} />
          </Col>
          <Col>
            <Button className="float-end" onClick={() => setShowAddModal(true)}>
              Add Task
            </Button>
          </Col>
          <Col className="col-2"></Col>
        </Row>
        <Tasks {...{ tasks, setTasks, searchProps }} />
      </div>
    </div>
  );
};

export default Dashboard;
