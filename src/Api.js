import axios from "axios";

export default axios.create({
  // baseURL: `http://localhost:49520/api`
  baseURL: `http://innovic.azurewebsites.net/api`
});
