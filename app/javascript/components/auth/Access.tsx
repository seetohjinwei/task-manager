import IUser from "../interfaces/InterfaceUser";
import Login from "./Login";
import Signup from "./Signup";
import React, { useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";

const Access = ({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUser;
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>;
}) => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // redirect to dashboard if logged_in
  //   console.log(userDetails.loginStatus);
  //   if (userDetails.loginStatus) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  const handleSuccessfulAuth = (user: IUser): void => {
    console.log("Handling successful authentication.");
    setUserDetails(user);
    // navigate("/dashboard");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const displayError = (errorMessage: string): void => {
    setUserDetails({ ...userDetails, authenticationErrors: errorMessage });
  };

  // TODO: add button to switch between signup/login
  return (
    <div>
      <Signup {...{ userDetails, handleSuccessfulAuth, handleChange, displayError }} />
      <Login {...{ userDetails, handleSuccessfulAuth, handleChange, displayError }} />
    </div>
  );
  // if (userDetails.loginStatus) {
  //   // useEffect(() => navigate("/dashboard"));
  //   // navigate("/dashboard");
  //   return (
  //     <div>
  //       <h1>Welcome {userDetails.username}!</h1>
  //       <Link to={"/dashboard"}>Go to Dashboard</Link>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div>
  //       <Signup {...{ userDetails, handleSuccessfulAuth, handleChange, displayError }} />
  //       <Login {...{ userDetails, handleSuccessfulAuth, handleChange, displayError }} />
  //     </div>
  //   );
  // }
};

export default Access;
