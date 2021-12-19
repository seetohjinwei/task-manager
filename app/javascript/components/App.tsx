import IUser from "./interfaces/InterfaceUser";
import Access from "./auth/Access";
import Dashboard from "./Dashboard";
import React, { useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

// main application page

const initUser: IUser = {
  loginStatus: false,
  username: "",
  password: "",
  password_confirmation: "",
  authenticationErrors: "",
};

const App = () => {
  const [userDetails, setUserDetails] = useState(initUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Access {...{ userDetails, setUserDetails }} />} />
        <Route path="/dashboard" element={<Dashboard {...{ userDetails, setUserDetails }} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
