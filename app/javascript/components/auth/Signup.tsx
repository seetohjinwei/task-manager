import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Signup = ({
  userDetails,
  handleSuccessfulAuth,
  handleChange,
  displayError,
  toggleLoginSignup,
}: {
  userDetails: IUser;
  handleSuccessfulAuth: (User: IUser) => void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  displayError: (errorMessage: string) => void;
  toggleLoginSignup: () => void;
}) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (userDetails.username.length < 5) {
      displayError("Username is required to have at least 5 characters.");
      return;
    } else if (userDetails.password.length < 6) {
      displayError("Password is required to have at least 6 characters.");
      return;
    } else if (userDetails.password !== userDetails.password_confirmation) {
      displayError("Passwords do not match.");
      return;
    }
    const user = {
      username: userDetails.username,
      password: userDetails.password,
      password_confirmation: userDetails.password_confirmation,
    };
    axios
      .post("https://jinwei-task-manager.herokuapp.com/registrations", user, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          handleSuccessfulAuth({
            ...user,
            loginStatus: true,
            authenticationErrors: userDetails.authenticationErrors,
          });
        } else {
          // render registration error
          displayError("Username already exists.");
        }
      })
      .catch((error) => {
        // error thrown from database
        displayError("Username already exists!");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="display-2 text-center">Sign Up Form</h1>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          value={userDetails.username}
          onChange={handleChange}
          required
        />
        <Form.Text muted>Username must be at least 5 characters long.</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={handleChange}
          required
        />
        <Form.Text muted>Passwords must be at least 6 characters long.</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={userDetails.password_confirmation}
          onChange={handleChange}
          required
        />
        {userDetails.password_confirmation &&
          userDetails.password !== userDetails.password_confirmation && (
            <Form.Text muted>Passwords do not match.</Form.Text>
          )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Sign Up!
      </Button>
      {/* align button to right */}
      <Button className="float-end" onClick={toggleLoginSignup} variant="secondary">
        Login instead!
      </Button>
    </Form>
  );
};

export default Signup;
