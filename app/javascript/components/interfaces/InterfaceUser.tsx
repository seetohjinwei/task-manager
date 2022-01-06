// need to update in Tasks.tsx as well, because each sort method has a different algorithm
export const sort_methods = ["default", "name", "deadline", "tags"];

export default interface IUser {
  login_status: boolean;
  username: string;
  password: string;
  password_confirmation: string;
  // display_done: hides "done" tasks
  display_done: boolean;
  // strict_search: matches for ALL search terms
  strict_search: boolean;
  sort_method: typeof sort_methods[number];
}
