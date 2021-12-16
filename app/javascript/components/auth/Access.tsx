import IUser from "../interfaces/InterfaceUser";
import Login from "./Login";
import Signup from "./Signup";
import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

const Access = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  const [showError, setShowError] = useState(false);
  // showLogin === true: login, showLogin === false: signup
  const [showLogin, setShowLogin] = useState(true);

  const handleSuccessfulAuth = (user: IUser): void => {
    console.log("Handling successful authentication.");
    setUserDetails(user);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const displayError = (errorMessage: string): void => {
    setShowError(true);
    setUserDetails({ ...userDetails, authenticationErrors: errorMessage });
  };

  const hideError = () => {
    setShowError(false);
  };

  const toggleLoginSignup = () => {
    setShowLogin(!showLogin);
  };

  return (
    // CSS: align center of screen
    <div>
      <div className="d-flex justify-content-center align-items-center">
        {showLogin ? (
          <Login
            {...{
              userDetails,
              handleSuccessfulAuth,
              handleChange,
              displayError,
              toggleLoginSignup,
            }}
          />
        ) : (
          <Signup
            {...{
              userDetails,
              handleSuccessfulAuth,
              handleChange,
              displayError,
              toggleLoginSignup,
            }}
          />
        )}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        {showError && (
          <Alert variant="warning" onClose={hideError} dismissible>
            {userDetails.authenticationErrors}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Access;
