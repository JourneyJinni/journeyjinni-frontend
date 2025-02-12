import axios from "axios";

const { VITE_VUE_API_URL } = import.meta.env;

// local vue api axios instance
function localAxios() {
  return axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { localAxios };
