import ITask from "./interfaces/InterfaceTask";
import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Task = (task: ITask) => {
  return (
    // deadline and tags render only if not empty
    <Card bg="light" border="dark" className={task.isDone ? "text-muted" : ""} body>
      <Card.Title className="d-flex justify-content-between">
        <Col className="col-10">{task.name}</Col>
        <Col className="col-1">
          <OverlayTrigger
            placement="top"
            overlay={(ref) => <Tooltip {...ref}>Mark as Done</Tooltip>}
          >
            <p className="bi-check2-square" role="button"></p>
          </OverlayTrigger>
        </Col>
        <Col className="col-1">
          <OverlayTrigger
            placement="top"
            overlay={(ref) => <Tooltip {...ref}>Delete Task</Tooltip>}
          >
            <p className="bi-trash" role="button"></p>
          </OverlayTrigger>
        </Col>
      </Card.Title>
      <Card.Text>{task.description}</Card.Text>
      {task.deadline && <Card.Text className="text-muted">{task.deadline}</Card.Text>}
      {task.tags.length !== 0 && (
        <span>
          <hr />
          <Card.Text>{task.tags.map((item) => "#" + item).join(" ")}</Card.Text>
        </span>
      )}
    </Card>
  );
};

export default Task;
