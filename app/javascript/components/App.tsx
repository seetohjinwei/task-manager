import { fetchTheme } from "./Functions/Fetch";
import IUser from "./interfaces/InterfaceUser";
import Access from "./auth/Access";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

const initUser: IUser = {
  login_status: false,
  username: "",
  password: "",
  password_confirmation: "",
  display_done: true,
  strict_search: false,
  sort_method: "default",
};

/** Main Application Component */
const App = () => {
  const [userDetails, setUserDetails] = useState(initUser);

  useEffect(() => {
    fetchTheme();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Access {...{ userDetails, setUserDetails }} />} />
        <Route path="/dashboard" element={<Dashboard {...{ userDetails, setUserDetails }} />} />
        <Route path="/settings" element={<Settings {...{ userDetails, setUserDetails }} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
