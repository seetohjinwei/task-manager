import axios, { AxiosResponse } from "axios";

// const domain = "http://localhost:3000";
const domain = "https://jinwei-task-manager.herokuapp.com";
type takeAxiosResponse = (response: AxiosResponse<any, any>) => void;

export const fetchTasks = (funcIfSuccess: takeAxiosResponse, funcIfError: takeAxiosResponse) => {
  axios.get(`${domain}/tasks`, { withCredentials: true }).then(funcIfSuccess).catch(funcIfError);
};

export const fetchLogout = (funcIfSuccess: takeAxiosResponse, funcIfError: takeAxiosResponse) => {
  axios
    .delete(`${domain}/logout`, { withCredentials: true })
    .then(funcIfSuccess)
    .catch(funcIfError);
};

export const fetchSearchOptions = (
  searchOptions,
  funcIfSuccess: takeAxiosResponse,
  funcIfError: takeAxiosResponse
) => {
  axios
    .patch(`${domain}/search_options`, searchOptions, { withCredentials: true })
    .then(funcIfSuccess)
    .catch(funcIfError);
};

export const fetchChangePassword = (
  passwordObject,
  funcIfSuccess: takeAxiosResponse,
  funcIfError: takeAxiosResponse
) => {
  axios
    .patch(`${domain}/change_password`, passwordObject, { withCredentials: true })
    .then(funcIfSuccess)
    .catch(funcIfError);
};

export const fetchUpdateTask = (
  newTaskId: number,
  tasks,
  funcIfSuccess: takeAxiosResponse,
  funcIfError: takeAxiosResponse
) => {
  axios
    .patch(`${domain}/tasks/${newTaskId}`, tasks, {
      withCredentials: true,
    })
    .then(funcIfSuccess)
    .catch(funcIfError);
};

export const fetchDeleteTask = (
  taskID: number,
  funcIfSuccess: takeAxiosResponse,
  funcIfError: takeAxiosResponse
) => {
  axios
    .delete(`${domain}/tasks/${taskID}`, {
      withCredentials: true,
    })
    .then(funcIfSuccess)
    .catch(funcIfError);
};

export const fetchLogin = (
  user,
  funcIfSuccess: takeAxiosResponse,
  funcIfError: takeAxiosResponse
) => {
  axios
    .post(`${domain}/sessions`, user, { withCredentials: true })
    .then(funcIfSuccess)
    .catch(funcIfError);
};

export const fetchSignup = (
  user,
  funcIfSuccess: takeAxiosResponse,
  funcIfError: takeAxiosResponse
) => {
  axios
    .post(`${domain}/registrations`, user, {
      withCredentials: true,
    })
    .then(funcIfSuccess)
    .catch(funcIfError);
};

export const fetchCheckIfLoggedIn = (
  funcIfSuccess: takeAxiosResponse,
  funcIfError: takeAxiosResponse
) => {
  axios
    .get(`${domain}/logged_in`, { withCredentials: true })
    .then(funcIfSuccess)
    .catch(funcIfError);
};

export const fetchAddTask = (
  task,
  funcIfSuccess: takeAxiosResponse,
  funcIfError: takeAxiosResponse
) => {
  axios
    .post(`${domain}/tasks`, task, { withCredentials: true })
    .then(funcIfSuccess)
    .catch(funcIfError);
};
