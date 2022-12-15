import axios from "axios";

export const beforeLoginAxios = axios.create({
  baseURL: "https://hotelapidemo.com",
  responseType: "json",
  timeout: 30000,
});
