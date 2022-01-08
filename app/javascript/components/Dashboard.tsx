import { checkLoginStatus } from "./Functions/CheckLogin";
import { fetchDeleteFinishedTasks, fetchTasks } from "./Functions/Fetch";
import { toTitleCase } from "./Functions/Misc";
import { TaskAdder, TaskClearer } from "./Functions/TaskFunctions";
import ITask from "./interfaces/InterfaceTask";
import IUser, { sort_methods } from "./interfaces/InterfaceUser";
import NavigationBar from "./NavigationBar";
import Search from "./Search";
import Tasks from "./Tasks";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

/** Page for /dashboard */
const Dashboard = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const navigate = useNavigate();

  const welcomeMessages = [
    // prefix + username + postfix
    ["Hello ", "!"],
    ["Yo ", "!"],
    ["Hi ya ", "!"],
    ["Hey there, ", "!"],
    ["", ", welcome!"],
    ["Your tasks, ", "."],
    ["<user>", "</user>"],
    ["You're back, ", "!"],
  ];

  /** Randomises welcome message. */
  useEffect(() => {
    if (userDetails.username) {
      const index = Math.floor(Math.random() * welcomeMessages.length);
      const [prefix, postfix] = welcomeMessages[index];
      setWelcomeMessage(prefix + userDetails.username + postfix);
    }
  }, [userDetails.username]);

  /** Loads tasks from database. */
  const loadTasks = () => {
    fetchTasks(
      (response) => setTasks(response.data.tasks),
      (error) => console.log(error)
    );
  };

  const clearTasks = () => {
    setShowClearModal(false);
    fetchDeleteFinishedTasks(
      (reponse) => setTasks(reponse.data.tasks),
      (error) => console.log("error", error)
    );
  };

  useEffect(() => {
    if (!userDetails.login_status) {
      // loginStatus is true means that user was re-directed here, as opposed to navigating from URL manually.
      checkLoginStatus(userDetails, setUserDetails, navigate, "/dashboard");
    }
    loadTasks();
  }, []);

  /** Handles sorting method change. */
  const handleSortMethodChange = (newMethod: IUser["sort_method"]) => {
    setUserDetails({ ...userDetails, sort_method: newMethod });
  };

  return (
    userDetails.login_status && (
      <div>
        <NavigationBar {...{ userDetails, setUserDetails }} />
        <TaskAdder {...{ showAddModal, setShowAddModal, tasks, setTasks }} />
        <TaskClearer {...{ showClearModal, setShowClearModal, clearTasks }} />
        <div className="m-5">
          <Row>
            <Col className="col-2"></Col>
            <Col>
              <h1>{welcomeMessage}</h1>
              <Search {...{ searchString, setSearchString, userDetails, setUserDetails }} />
              <Button className="m-1" onClick={() => setShowClearModal(true)}>
                Clear Finished Tasks
              </Button>
            </Col>
            <Col>
              <DropdownButton
                variant="outline-secondary"
                className="float-end m-1"
                title={"Sorting by: " + userDetails.sort_method}
              >
                {sort_methods.map((sort_type, index) => {
                  return (
                    <Dropdown.Item key={index} onClick={() => handleSortMethodChange(sort_type)}>
                      {toTitleCase(sort_type)}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
              <Button className="float-end m-1" onClick={() => setShowAddModal(true)}>
                Add Task
              </Button>
            </Col>
            <Col className="col-2"></Col>
          </Row>
          <Tasks {...{ tasks, setTasks, searchString, userDetails }} />
        </div>
      </div>
    )
  );
};

export default Dashboard;
