import { fetchCheckIfLoggedIn } from "./Fetch";
import IUser from "../interfaces/InterfaceUser";
import { NavigateFunction } from "react-router-dom";

/** Checks if user is logged in. Handles setting of userDetails and navigation as well. */
export const checkLoginStatus = (
  userDetails: IUser,
  setUserDetails: React.Dispatch<React.SetStateAction<IUser>>,
  navigate: NavigateFunction,
  navigateToIfSuccessful: string
) => {
  fetchCheckIfLoggedIn(
    (response) => {
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
    },
    (error) => console.log(error)
  );
};
