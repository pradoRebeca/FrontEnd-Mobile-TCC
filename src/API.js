import axios from "axios";

const axiosURL =
  axios.create({
  baseURL: "http://10.107.144.26:8080/"
});

export default axiosURL;