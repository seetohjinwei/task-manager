import { checkLoginStatus } from "../Functions/CheckLogin";
import IUser from "../interfaces/InterfaceUser";
import Login from "./Login";
import Signup from "./Signup";
import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const Access = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const [message, setMessage] = useState("");
  // showLogin === true: login, showLogin === false: signup
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  /** Sets userDetails and navigates to dashboard, called by Login and Signup */
  const handleSuccessfulAuth = (user: IUser): void => {
    setUserDetails(user);
    navigate("/dashboard");
  };

  /** Handles form change */
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  /** Toggles between Login and Signup */
  const toggleLoginSignup = () => {
    // resets all fields as well
    setUserDetails({ ...userDetails, username: "", password: "", password_confirmation: "" });
    setShowLogin(!showLogin);
  };

  /** Triggered on page load, navigates to /dashboard if logged in. */
  useEffect(() => {
    if (!userDetails.login_status) {
      // timeout to prevent race condition when logging out
      setTimeout(() => checkLoginStatus(userDetails, setUserDetails, navigate, "/dashboard"), 500);
    }
  }, []);

  return (
    <div className="py-4">
      <div className="center">
        {/* showLogin: Toggles between Login and Signup */}
        {showLogin ? (
          <Login
            {...{
              userDetails,
              handleSuccessfulAuth,
              handleChange,
              setMessage,
              toggleLoginSignup,
            }}
          />
        ) : (
          <Signup
            {...{
              userDetails,
              handleSuccessfulAuth,
              handleChange,
              setMessage,
              toggleLoginSignup,
            }}
          />
        )}
      </div>
      {/* Error popup from displayError. */}
      <div className="center mt-3">
        {message && (
          <Alert variant="warning" onClose={() => setMessage("")} dismissible>
            {message}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Access;
