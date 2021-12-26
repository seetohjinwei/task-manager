import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({
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
  /** Handles form submission. */
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // Double checks username and password lengths, even though HTML already prevents it.
    if (userDetails.username.length < 5) {
      displayError("Might wanna check your username. (It's too short.)");
      return;
    } else if (userDetails.password.length < 6) {
      displayError("Might wanna check your password. (It's too short.)");
      return;
    }
    const user = {
      username: userDetails.username,
      password: userDetails.password,
    };
    axios
      .post("https://jinwei-task-manager.herokuapp.com/sessions", user, { withCredentials: true })
      .then((response) => {
        const user = response.data.user;
        handleSuccessfulAuth({
          ...user,
          password_confirmation: user.password,
          login_status: true,
          authentication_errors: userDetails.authentication_errors,
        });
      })
      .catch((error) => {
        // error thrown from database
        displayError("Wrong username or password.");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="display-2 text-center">Welcome back!</h1>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          value={userDetails.username}
          onChange={handleChange}
          minLength={5}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={handleChange}
          minLength={6}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login!
      </Button>
      <Button className="float-end" onClick={toggleLoginSignup} variant="secondary">
        Sign up instead!
      </Button>
    </Form>
  );
};

export default Login;
