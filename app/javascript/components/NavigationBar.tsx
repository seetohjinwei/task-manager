import IUser from "./interfaces/InterfaceUser";
import Logout from "./auth/Logout";
import React from "react";
import { Link } from "react-router-dom";
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
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/" className="nav-link">
            Placeholder
          </Link>
          <Logout {...{ userDetails, setUserDetails }}></Logout>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
