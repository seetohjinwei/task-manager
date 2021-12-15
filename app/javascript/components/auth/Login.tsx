import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import React from "react";

const Login = ({
  userDetails,
  handleSuccessfulAuth,
  handleChange,
}: {
  userDetails: IUser;
  handleSuccessfulAuth: (User: IUser) => void;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const user = {
      user: {
        username: userDetails.username,
        password: userDetails.password,
      },
    };
    axios
      .post("http://localhost:3000/sessions", user, { withCredentials: true })
      .then((response) => {
        console.log("logging response", response);
        if (response.data.status === "created") {
          console.log("user logged in!", response);
          handleSuccessfulAuth({
            ...user.user,
            password_confirmation: user.user.password,
            loginStatus: true,
            authenticationErrors: userDetails.authenticationErrors,
          });
        } else {
          // render registration error
        }
      })
      .catch((error) => {
        // error thrown from database
        console.log("error in registration", error);
      });
    event.preventDefault();
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
    </div>
  );
};

export default Login;
