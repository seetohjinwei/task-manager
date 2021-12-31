import { formatDateLong } from "./Functions/TaskFunctions";
import ITask from "./interfaces/InterfaceTask";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

/** Drag Handle for dragging tasks around in "default" sort method. */
const DragHandle = () => {
  // SVG obtained from bootstrap-icons
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      className="bi bi-grip-horizontal draghandle"
      viewBox="0 0 16 16"
    >
      <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
};

/** Task Component */
const Task = ({
  task,
  updateTask,
  deleteTask,
  draggable,
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
  draggable: boolean;
}) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const TaskModal = () => {
    // tags is a string (in TaskModal) for easy manipulation
    const [modalTask, setModalTask] = useState({ ...task, tags: task.tags.join(" ") });
    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(false);
    const [editDate, setEditDate] = useState(false);
    const [editTags, setEditTags] = useState(false);
    /** Handle form change. */
    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
      event
    ) => {
      setModalTask({ ...modalTask, [event.target.name]: event.target.value });
    };
    /** Handle form submission. */
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
        className={modalTask.isdone && "text-muted"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editTitle ? (
              <input
                className="form-input"
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
              className="form-input"
              name="description"
              placeholder="Description"
              value={modalTask.description}
              onChange={handleChange}
              onBlur={() => setEditDescription(false)}
              autoFocus
            />
          ) : (
            <div className="mb-3 task-description" onClick={() => setEditDescription(true)}>
              {modalTask.description ? (
                modalTask.description
              ) : (
                <i>Click here to add a description.</i>
              )}
            </div>
          )}
          {editDate ? (
            <input
              className="form-input"
              type="date"
              name="deadline"
              placeholder="Deadline"
              value={modalTask.deadline}
              onChange={handleChange}
              onBlur={() => setEditDate(false)}
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
              className="form-input"
              type="text"
              name="tags"
              placeholder="tag1 tag2 tag3"
              value={modalTask.tags}
              onChange={handleChange}
              onBlur={() => setEditTags(false)}
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

  /** Handles toggle button press. */
  const handleToggleDone = () => {
    const updatedTask = { ...task, isdone: !task.isdone };
    updateTask(task, updatedTask);
  };

  /** Handles delete button press. */
  const handleDelete = () => {
    deleteTask(task);
  };

  /** Parameters important for @dnd-kit dragging. */
  // @dnd-kit is used because it supports grids :D
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
        {/* Currently only draggable if sort_method is "default" */}
        {draggable && (
          <div
            className="d-inline-block no-touch-action"
            ref={setNodeRef}
            {...attributes}
            {...listeners}
          >
            <DragHandle />
            <DragHandle />
            <DragHandle />
          </div>
        )}
      </div>
      <TaskModal />
      <Card className={`${task.isdone && "text-muted"} ${isDragging && "card-dragging"}`} body>
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
