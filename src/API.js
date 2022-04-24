import axios from "axios";

const axiosURL =
  axios.create({
  baseURL: "http://10.107.144.24:8080/"
});

export default axiosURL;