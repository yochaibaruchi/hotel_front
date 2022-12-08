import axios from "axios";

export const beforeLoginAxios = axios.create({
  baseURL: "https://hotelapidemo.com",
  responseType: "json",
  timeout: 30000,
});

const token = sessionStorage["token"];
export const afterLoginAxios = axios.create({
  baseURL: "https://hotelapidemo.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "x-access-token": token,
  },
});
