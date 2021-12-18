import { formatDateLong, formatDateShort, TaskAdder } from "./Functions/TaskFunctions";
import ITask from "./interfaces/InterfaceTask";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Task = ({
  task,
  updateTask,
  deleteTask,
}: {
  task: ITask;
  updateTask: (
    originalTask: ITask,
    newTask: {
      id: number;
      name?: string;
      description?: string;
      tags?: string[];
      deadline?: string;
      isdone?: boolean;
    }
  ) => void;
  deleteTask: (task: ITask) => void;
}) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const TaskModal = () => {
    return (
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{task.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{task.description}</p>
          {task.deadline && <p className="text-muted">{formatDateLong(task.deadline)}</p>}
          {task.tags.length !== 0 && <p>{task.tags.map((item) => "#" + item).join(" ")}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const handleToggleDone = () => {
    const updatedTask = { ...task, isdone: !task.isdone };
    updateTask(task, updatedTask);
  };
  const handleDelete = () => {
    deleteTask(task);
  };

  return (
    // deadline and tags render only if not empty
    <>
      <TaskModal />
      <Card bg="light" border="dark" className={task.isdone ? "text-muted" : ""} body>
        <Card.Title className="d-flex justify-content-between">
          <Col className="col-10" onClick={() => setShowTaskModal(true)}>
            {task.name}
          </Col>
          <Col className="col-1">
            <OverlayTrigger
              placement="top"
              overlay={(ref) => <Tooltip {...ref}>"Mark as Done"</Tooltip>}
            >
              <p className="bi-check2-square" role="button" onClick={handleToggleDone}></p>
            </OverlayTrigger>
          </Col>
          <Col className="col-1">
            <OverlayTrigger
              placement="top"
              overlay={(ref) => <Tooltip {...ref}>"Delete Task"</Tooltip>}
            >
              <p className="bi-trash" role="button" onClick={handleDelete}></p>
            </OverlayTrigger>
          </Col>
        </Card.Title>
        <Card.Text className="text-truncate">{task.description}</Card.Text>
        {task.deadline && (
          <Card.Text className="text-muted">{formatDateLong(task.deadline)}</Card.Text>
        )}
        {task.tags.length !== 0 && (
          <span>
            <hr />
            <Card.Text>{task.tags.map((item) => "#" + item).join(" ")}</Card.Text>
          </span>
        )}
      </Card>
    </>
  );
};

export default Task;
