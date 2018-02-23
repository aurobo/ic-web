import axios from "axios";

const api = axios.create({
  // baseURL: `http://localhost:49520/api`
  baseURL: `http://innovic.azurewebsites.net/api`
  // baseUrl: `http://dev-innovic-api.azurewebsites.net/api`
});

export { api };
