import axios from "axios";
let baseURL = "https://api.icestreethq.com/";
let token;

axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";

const instancePublic = axios.create({
  baseURL,
});

export default instancePublic;
