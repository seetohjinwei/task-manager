import IUser from "./interfaces/InterfaceUser";
import axios from "axios";
import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";

const SettingsForm = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const [optionsForm, setOptionsForm] = useState({
    display_done: userDetails.display_done,
    strict_search: userDetails.strict_search,
    sort_method: userDetails.sort_method,
  });
  const [passwordForm, setPasswordForm] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });
  const [showError, setShowError] = useState(false);
  const displayError = (message: string) => {
    setShowError(true);
    setUserDetails({ ...userDetails, authentication_errors: message });
  };
  const handleOptionsChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setOptionsForm({ ...optionsForm, [event.target.name]: event.target.checked });
  };
  const handleSortMethodChange = (method: IUser["sort_method"]) => {
    setOptionsForm({ ...optionsForm, sort_method: method });
  };
  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setPasswordForm({ ...passwordForm, [event.target.name]: event.target.value });
  };
  const handleOptionsSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    axios
      .patch(
        "https://jinwei-task-manager.herokuapp.com/search_options",
        {
          display_done: optionsForm.display_done,
          strict_search: optionsForm.strict_search,
          sort_method: optionsForm.sort_method,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setUserDetails({ ...userDetails, ...optionsForm });
        displayError("Changed Successfully!");
      })
      .catch((error) => {
        displayError("Something went wrong...");
        console.log(error);
      });
  };
  const handlePasswordSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (passwordForm.password !== passwordForm.password_confirmation) {
      displayError("Passwords do not match!");
    } else {
      axios
        .patch(
          "https://jinwei-task-manager.herokuapp.com/change_password",
          {
            username: userDetails.username,
            old_password: passwordForm.old_password,
            password: passwordForm.password,
            password_confirmation: passwordForm.password_confirmation,
          },
          { withCredentials: true }
        )
        .then((response) => {
          displayError("Changed Successfully!");
        })
        .catch((error) => {
          console.log(error);
          displayError("Wrong Password!");
        });
    }
  };
  return (
    <div>
      <div className="d-flex my-3" style={{ display: "flex", justifyContent: "space-between" }}>
        <Form onSubmit={handleOptionsSubmit}>
          <Form.Group className="my-3">
            <h2>Change Default Search Options</h2>
            <DropdownButton
              variant="outline-secondary"
              className="my-2"
              title={"Sorting by: " + optionsForm.sort_method}
            >
              <Dropdown.Item onClick={() => handleSortMethodChange("default")}>
                Default
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortMethodChange("deadline")}>
                Deadline
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortMethodChange("alphabetical")}>
                Alphabetical
              </Dropdown.Item>
            </DropdownButton>
            <Form.Check
              type="switch"
              label="Show Finished Tasks"
              name="display_done"
              checked={optionsForm.display_done}
              onChange={handleOptionsChange}
            />
            <Form.Check
              type="switch"
              label="Match All Search Terms"
              name="strict_search"
              checked={optionsForm.strict_search}
              onChange={handleOptionsChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
        <Form onSubmit={handlePasswordSubmit}>
          <h2>Change Account Password</h2>
          <Form.Group className="mb-3">
            <Form.Label>Old Password</Form.Label>
            <Form.Control
              type="password"
              name="old_password"
              placeholder="Old Password"
              value={passwordForm.old_password}
              onChange={handlePasswordChange}
              minLength={6}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="New Password"
              value={passwordForm.password}
              onChange={handlePasswordChange}
              minLength={6}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              placeholder="Confirm New Password"
              value={passwordForm.password_confirmation}
              onChange={handlePasswordChange}
              minLength={6}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        {showError && (
          <Alert variant="warning" onClose={() => setShowError(false)} dismissible>
            {userDetails.authentication_errors}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SettingsForm;
