import axios from "axios";
const token = sessionStorage["token"];

export const beforeLoginAxios = axios.create({
  baseURL:
    "http://nodehotel-env.eba-j2swbhjm.eu-central-1.elasticbeanstalk.com",
  responseType: "json",
  timeout: 30000,
});

export const afterLoginAxios = axios.create({
  baseURL:
    "http://nodehotel-env.eba-j2swbhjm.eu-central-1.elasticbeanstalk.com",
  responseType: "json",
  timeout: 30000,
  headers: {
    "x-access-token": token,
  },
});
