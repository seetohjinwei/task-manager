import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const checkLoginStatus = (
  userDetails: IUser,
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>,
  navigate: NavigateFunction
) => {
  return axios
    .get("http://localhost:3000/logged_in", { withCredentials: true })
    .then((response) => {
      if (response.data.logged_in) {
        setUserDetails({
          ...userDetails,
          loginStatus: true,
          username: response.data.user.username,
        });
        navigate("/dashboard");
      } else {
        setUserDetails({
          ...userDetails,
          loginStatus: false,
          username: "",
          password: "",
          password_confirmation: "",
        });
        navigate("/");
      }
    })
    .catch((error) => console.log(error));
};
