import IUser from "./interfaces/InterfaceUser";
import axios from "axios";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

/** Navigation Bar at the top. */
const NavigationBar = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  /** Handles logout. */
  const handleLogout = () => {
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
  };
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/settings" className="nav-link">
              Settings
            </NavLink>
            <NavLink to="/" className="nav-link" onClick={handleLogout}>
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
