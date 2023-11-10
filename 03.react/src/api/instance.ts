import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:33088/api/todolist",
});

export default instance;
