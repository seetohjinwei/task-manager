import { formatDateLong } from "./Functions/TaskFunctions";
import ITask from "./interfaces/InterfaceTask";
import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const DragHandle = () => {
  // SVG obtained from bootstrap-icons
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-grip-horizontal"
      viewBox="0 0 16 16"
    >
      <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
};

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
    // tags is a string (in TaskModal) for easy manipulation
    const [modalTask, setModalTask] = useState({ ...task, tags: task.tags.join(" ") });
    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false);
    const [editDate, setEditDate] = useState(false);
    const [editTags, setEditTags] = useState(false);
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
      event
    ) => {
      setModalTask({ ...modalTask, [event.target.name]: event.target.value });
    };
    const handleSubmit = () => {
      const newTask = {
        id: modalTask.id,
        name: modalTask.name,
        description: modalTask.description,
        tags: modalTask.tags ? modalTask.tags.split(" ") : [],
        deadline: modalTask.deadline,
        isdone: modalTask.isdone,
      };
      setShowTaskModal(false);
      updateTask(task, newTask);
    };
    return (
      <Modal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        backdrop="static"
        className={modalTask.isdone ? "text-muted" : ""}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editTitle ? (
              <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={modalTask.name}
                onChange={handleChange}
                onBlur={() => setEditTitle(false)}
                autoFocus
              />
            ) : (
              <div onClick={() => setEditTitle(true)}>{modalTask.name}</div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editDescription ? (
            <textarea
              name="description"
              className="w-100 mb-3"
              placeholder="Description"
              value={modalTask.description}
              onChange={handleChange}
              onBlur={() => setEditDescription(false)}
              autoFocus
            />
          ) : (
            <div
              className="mb-3"
              style={{ whiteSpace: "pre-line" }}
              onClick={() => setEditDescription(true)}
            >
              {modalTask.description ? (
                modalTask.description
              ) : (
                <i>Click here to add a description.</i>
              )}
            </div>
          )}
          {editDate ? (
            <input
              type="date"
              name="deadline"
              placeholder="Deadline"
              value={modalTask.deadline}
              onChange={handleChange}
              onBlur={() => setEditDate(false)}
              className="mb-3"
              autoFocus
            />
          ) : (
            <div className="text-muted mb-3" onClick={() => setEditDate(true)}>
              {modalTask.deadline ? (
                formatDateLong(modalTask.deadline)
              ) : (
                <i>Click here to add a deadline.</i>
              )}
            </div>
          )}
          {editTags ? (
            <input
              type="text"
              name="tags"
              placeholder="tag1 tag2 tag3"
              value={modalTask.tags}
              onChange={handleChange}
              onBlur={() => setEditTags(false)}
              className="mb-3"
              autoFocus
            />
          ) : (
            <div className="mb-3" onClick={() => setEditTags(true)}>
              {modalTask.tags.length !== 0 ? (
                <p>
                  {modalTask.tags
                    .split(" ")
                    .map((item) => "#" + item)
                    .join(" ")}
                </p>
              ) : (
                <i>Click here to add tags.</i>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Save</Button>
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

  const { setNodeRef, attributes, listeners, transition, transform, isDragging } = useSortable({
    id: task.posid.toString(),
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    width: "300px",
  };

  return (
    // deadline and tags render only if not empty
    <div style={style}>
      <div className="text-center">
        <div className="d-inline-block" ref={setNodeRef} {...attributes} {...listeners}>
          <DragHandle />
          <DragHandle />
          <DragHandle />
        </div>
      </div>
      <TaskModal />
      <Card
        bg="light"
        border="dark"
        className={task.isdone ? "text-muted" : ""}
        style={{
          boxShadow: isDragging ? "3px 3px 1px #9E9E9E" : "",
          opacity: isDragging ? 0.5 : 1,
        }}
        body
      >
        <Card.Title className="d-flex justify-content-between">
          <Col className="col-10" onClick={() => setShowTaskModal(true)}>
            {task.name}
          </Col>
          <Col className="col-1">
            <OverlayTrigger
              placement="top"
              overlay={(ref) => <Tooltip {...ref}>Mark as Done</Tooltip>}
            >
              <p className="bi-check2-square" role="button" onClick={handleToggleDone} />
            </OverlayTrigger>
          </Col>
          <Col className="col-1">
            <OverlayTrigger
              placement="top"
              overlay={(ref) => <Tooltip {...ref}>Delete Task</Tooltip>}
            >
              <p className="bi-trash" role="button" onClick={handleDelete} />
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
    </div>
  );
};

export default Task;
