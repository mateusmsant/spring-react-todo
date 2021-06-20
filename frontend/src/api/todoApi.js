import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:808/api/v1",
});
