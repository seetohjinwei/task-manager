export default interface IUser {
  login_status: boolean;
  username: string;
  password: string;
  password_confirmation: string;
  // display_done: hides "done" tasks
  display_done: boolean;
  // strict_search: matches for ALL search terms
  strict_search: boolean;
  sort_method: "default" | "deadline" | "alphabetical";
}
