import axios from "axios";

export const http = (token = null) => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 5000,
    headers: {
      "x-access-token": token,
    },
  });
};
