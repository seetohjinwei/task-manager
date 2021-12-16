import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";

const Logout = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    axios
      .delete("http://localhost:3000/logout", { withCredentials: true })
      .then()
      .catch((error) => console.log("failed to logout", error));
    setUserDetails({
      ...userDetails,
      loginStatus: false,
      username: "",
      password: "",
      password_confirmation: "",
    });
  };
  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
