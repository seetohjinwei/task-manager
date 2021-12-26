import ITask from "../interfaces/InterfaceTask";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

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

/** Converts "YYYY-MM-DD" to "DD LongMonth YYYY" */
export const formatDateLong = (shortDate: string) => {
  const parts: string[] = shortDate.split("-");
  return parts[2] + " " + months[parseInt(parts[1])] + " " + parts[0];
};

/** Covnerts "DD LongMonth YYYY" to "YYYY-MM-DD" */
export const formatDateShort = (longDate: string): string => {
  const parts: string[] = longDate.split(" ");
  return parts[2] + "-" + months.indexOf(parts[1]) + "-" + parts[0];
};

/** Adds task to database and adds to local state. */
const addTask = (task, tasks: ITask[], setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  axios
    .post("https://jinwei-task-manager.herokuapp.com/tasks", task, { withCredentials: true })
    .then((response) => {
      const tasksCopy = [...tasks];
      tasksCopy.push(response.data.task);
      setTasks(tasksCopy);
    })
    .catch((error) => console.log("error", error));
};

/** Task adding Form/Modal (Form in a Modal). */
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
    // tags is a string for easy modification, converted back when submitting.
    tags: "",
    deadline: "",
    isdone: false,
  };
  const [task, setTask] = useState(blankTask);
  /** Handles form change. */
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };
  /** Handles form submission. */
  const handleSubmit: React.MouseEventHandler<HTMLFormElement> = (event) => {
    const taskToBeAdded = {
      ...task,
      // adds to the back
      posid: tasks.length,
      // convert tags in this Modal from string to array.
      tags: task.tags === "" ? [] : task.tags.split(" "),
    };
    event.preventDefault();
    // Hides Modal.
    setShowAddModal(false);
    addTask(taskToBeAdded, tasks, setTasks);
    // Sets task back to blank so next time user opens up the form, it's blank.
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
