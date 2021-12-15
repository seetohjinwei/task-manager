import IUser from "./interfaces/InterfaceUser";
import Dashboard from "./Dashboard";
import Access from "./auth/Access";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// main application page

const initUser: IUser = {
  loginStatus: false,
  username: "",
  password: "",
  password_confirmation: "",
  authenticationErrors: "",
};

const App = () => {
  const checkLoginStatus = () => {
    // console.log("checking login status");
    axios
      .get("http://localhost:3000/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          // is logged in
          setUserDetails({
            ...userDetails,
            loginStatus: true,
            username: response.data.user.username,
          });
        } else {
          // not logged in
          setUserDetails({
            ...userDetails,
            loginStatus: false,
            username: "",
            password: "",
            password_confirmation: "",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(checkLoginStatus, []);

  const [userDetails, setUserDetails] = useState(initUser);
  if (userDetails.loginStatus) {
    return <Dashboard {...{ userDetails, setUserDetails }} />;
  } else {
    return <Access {...{ userDetails, setUserDetails }} />;
  }
  // trying out using single page for now
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<Access {...{ userDetails, setUserDetails }} />} />
  //       {/* <Route path="/dashboard" element={<Dashboard {...{ userDetails, setUserDetails }} />} /> */}
  //       <Route path="/dashboard" element={<Dashboard {...userDetails} />} />
  //     </Routes>
  //   </Router>
  // );
};

export default App;
