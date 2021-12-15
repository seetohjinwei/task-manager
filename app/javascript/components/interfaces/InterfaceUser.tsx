export default interface IUser {
  loginStatus: boolean;
  username: string;
  password: string;
  password_confirmation: string;
  authenticationErrors: string;
}
