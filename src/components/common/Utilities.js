import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:49520/api`
  // baseURL: `http://innovic.azurewebsites.net/api`
  // baseURL: `http://dev-innovic-api.azurewebsites.net/api`
});

api.interceptors.request.use(
  function(config) {
    var token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export { api };
