import ITask from "./interfaces/InterfaceTask";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Task = (task: ITask) => {
  const months = [
    "Secret Month 0", // I don't like subtraction
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const formatDateLong = (YYMMDD: string): string => {
    // hardcoded to 21st century :D
    return (
      YYMMDD.substring(4, 6) +
      " " +
      months[parseInt(YYMMDD.substring(2, 4))] +
      " 20" +
      YYMMDD.substring(0, 2)
    );
  };
  const formatDateShort = (longDate: string): string => {
    const parts: string[] = longDate.split(" ");
    return parts[2].substring(2, 4) + months.indexOf(parts[1]) + parts[0];
  };
  const IconHelper = ({ option }: { option: "done" | "delete" }) => {
    const options = ["done", "delete"];
    const messages = ["Mark as Done", "Delete Task"];
    const icons = ["bi-check2-square", "bi-trash"];
    const index = options.indexOf(option);
    return (
      <OverlayTrigger
        placement="top"
        overlay={(ref) => <Tooltip {...ref}>{messages[index]}</Tooltip>}
      >
        <p className={icons[index]} role="button"></p>
      </OverlayTrigger>
    );
  };
  const [showModal, setShowModal] = useState(false);
  const TaskModal = () => {
    return (
      <Modal show={showModal} onHide={() => setShowModal(!showModal)} backdrop="static">
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

  return (
    // deadline and tags render only if not empty
    <>
      <TaskModal />
      <Card bg="light" border="dark" className={task.isdone ? "text-muted" : ""} body>
        <Card.Title className="d-flex justify-content-between">
          <Col className="col-10" onClick={() => setShowModal(!showModal)}>
            {task.name}
          </Col>
          <Col className="col-1">
            <IconHelper {...{ option: "done" }} />
          </Col>
          <Col className="col-1">
            <IconHelper {...{ option: "delete" }} />
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
