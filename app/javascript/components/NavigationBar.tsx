import IUser from "./interfaces/InterfaceUser";
import Logout from "./auth/Logout";
import React from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Task Manager</Navbar.Brand>
        <Nav>
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/settings" className="nav-link">
            Settings
          </NavLink>
          <Logout {...{ userDetails, setUserDetails }}></Logout>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
