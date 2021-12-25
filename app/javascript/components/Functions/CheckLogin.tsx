import IUser from "../interfaces/InterfaceUser";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const checkLoginStatus = (
  userDetails: IUser,
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>,
  navigate: NavigateFunction,
  navigateToIfSuccessful: string
) => {
  return axios
    .get("https://jinwei-task-manager.herokuapp.com/logged_in", { withCredentials: true })
    .then((response) => {
      if (response.data.logged_in) {
        const user = response.data.user;
        setUserDetails({
          ...userDetails,
          login_status: true,
          username: user.username,
          display_done: user.display_done,
          strict_search: user.strict_search,
          sort_method: user.sort_method,
        });
        navigate(navigateToIfSuccessful);
      } else {
        setUserDetails({
          ...userDetails,
          login_status: false,
          username: "",
          password: "",
          password_confirmation: "",
        });
        navigate("/");
      }
    })
    .catch((error) => console.log(error));
};
