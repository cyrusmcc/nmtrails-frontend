import axios from "axios";

const trails = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL + "/api/trails",
  headers: {
    "Content-Type": "application/json",
  },
});

const regions = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL + "/api/regions",
  headers: {
    "Content-Type" : "application/json"
  }
});

export {trails, regions};