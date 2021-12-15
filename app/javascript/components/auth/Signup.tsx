import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import React from "react";

const Signup = ({
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
        password_confirmation: userDetails.password_confirmation,
      },
    };
    axios
      .post("http://localhost:3000/registrations", user, { withCredentials: true })
      .then((response) => {
        if (response.data.status === "created") {
          console.log("user created successfully");
          handleSuccessfulAuth({
            ...user.user,
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
