import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import React from "react";

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
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
