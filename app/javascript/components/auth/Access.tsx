import IUser from "../interfaces/InterfaceUser";
import Login from "./Login";
import Signup from "./Signup";
import React from "react";
import { useNavigate } from "react-router-dom";

const Access = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const navigate = useNavigate();
  const handleSuccessfulAuth = (user: IUser): void => {
    console.log("Handling successful authentication.");
    setUserDetails(user);
    navigate("/dashboard");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  // TODO: add button to switch between signup/login
  return (
    <div>
      <Signup {...{ userDetails, handleSuccessfulAuth, handleChange }} />
      <Login {...{ userDetails, handleSuccessfulAuth, handleChange }} />
    </div>
  );
};

export default Access;
