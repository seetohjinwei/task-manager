import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import React from "react";

const Signup = ({
  userDetails,
  handleSuccessfulAuth,
  handleChange,
  displayError,
}: {
  userDetails: IUser;
  handleSuccessfulAuth: (User: IUser) => void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  displayError: (errorMessage: string) => void;
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
      user: {
        username: userDetails.username,
        password: userDetails.password,
        password_confirmation: userDetails.password_confirmation,
      },
    };
    axios
      .post("http://localhost:3000/registrations", user, { withCredentials: true })
      .then((response) => {
        if (response.data.status === "created") {
          // console.log("user created successfully");
          handleSuccessfulAuth({
            ...user.user,
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
        // console.log("error in registration", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={userDetails.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={userDetails.password_confirmation}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign up!</button>
      </form>
    </div>
  );
};

export default Signup;
