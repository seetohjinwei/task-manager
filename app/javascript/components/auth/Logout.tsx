import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import Button from "react-bootstrap/Button";

const Logout = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const navigate = useNavigate();
  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    axios
      .delete("https://jinwei-task-manager.herokuapp.com/logout", { withCredentials: true })
      .then()
      .catch((error) => console.log("failed to logout", error));
    setUserDetails({
      ...userDetails,
      login_status: false,
      username: "",
      password: "",
      password_confirmation: "",
    });
    navigate("/");
  };
  return (
    <Button variant="dark" className="text-muted" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
