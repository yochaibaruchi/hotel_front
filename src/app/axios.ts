import axios from "axios";

export const beforeLoginAxios = axios.create({
  baseURL:
    "http://nodehotel-env.eba-j2swbhjm.eu-central-1.elasticbeanstalk.com",
  responseType: "json",
  timeout: 30000,
});
