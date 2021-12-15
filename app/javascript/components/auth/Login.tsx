import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import React from "react";

const Login = ({
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
      displayError("Might wanna check your username. (It's too short.)");
      return;
    } else if (userDetails.password.length < 6) {
      displayError("Might wanna check your password. (It's too short.)");
      return;
    }
    const user = {
      user: {
        username: userDetails.username,
        password: userDetails.password,
      },
    };
    axios
      .post("http://localhost:3000/sessions", user, { withCredentials: true })
      .then((response) => {
        // console.log("logging response", response);
        if (response.data.status === "created") {
          // console.log("user logged in!", response);
          handleSuccessfulAuth({
            ...user.user,
            password_confirmation: user.user.password,
            loginStatus: true,
            authenticationErrors: userDetails.authenticationErrors,
          });
        } else {
          // render registration error
          displayError("Wrong username or password.");
        }
      })
      .catch((error) => {
        // error thrown from database
        displayError("Wrong username or password.");
        // console.log("Wrong username or password.", error);
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

        <button type="submit">Login!</button>
      </form>
      <div>{userDetails.authenticationErrors}</div>
    </div>
  );
};

export default Login;
