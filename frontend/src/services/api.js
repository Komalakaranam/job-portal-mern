import axios from "axios";

const API = axios.create({
  baseURL: "https://job-portal-mern-6.onrender.com/api",
});

export default API;
