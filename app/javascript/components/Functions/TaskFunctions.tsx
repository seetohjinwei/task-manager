import ITask from "../interfaces/InterfaceTask";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export const months = [
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

export const formatDateLong = (shortDate: string) => {
  const parts: string[] = shortDate.split("-");
  return parts[2] + " " + months[parseInt(parts[1])] + " " + parts[0];
};

export const formatDateShort = (longDate: string): string => {
  const parts: string[] = longDate.split(" ");
  return parts[2] + "-" + months.indexOf(parts[1]) + "-" + parts[0];
};

const addTask = (task, tasks: ITask[], setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  axios
    .post("http://localhost:3000/tasks", task, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        const tasksCopy = [...tasks];
        tasksCopy.push(response.data.task);
        setTasks(tasksCopy);
      } else {
        console.log("error", response);
      }
    })
    .catch((error) => console.log("error", error));
};

export const TaskAdder = ({
  showAddModal,
  setShowAddModal,
  tasks,
  setTasks,
}: {
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}) => {
  const blankTask = {
    name: "",
    description: "",
    tags: "",
    deadline: "",
    isdone: false,
  };
  const [task, setTask] = useState(blankTask);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };
  const handleSubmit: React.MouseEventHandler<HTMLFormElement> = (event) => {
    const taskToBeAdded = {
      ...task,
      posid: tasks.length,
      tags: task.tags === "" ? [] : task.tags.split(" "),
    };
    event.preventDefault();
    setShowAddModal(false);
    addTask(taskToBeAdded, tasks, setTasks);
    setTask(blankTask);
  };

  return (
    <Modal show={showAddModal} onHide={() => setShowAddModal(false)} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>New Task!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Task Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Task Name"
              value={task.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              placeholder="Description..."
              value={task.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              name="tags"
              placeholder={"tag1 tag2 tag3"}
              value={task.tags}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="date"
              name="deadline"
              placeholder="Deadline"
              value={task.deadline}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="float-end" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
