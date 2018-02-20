import axios from "axios";

export default {
  getGithubUser(userName) {
    let clientId = "c65c250a625a635287e4";
    let client_secret = "e3f52d207ce460df391ae2b4bc77e74fe89a1f1c";
    return axios.get(
      "https://api.github.com/users/" +
        userName +
        "?client_id=" +
        clientId +
        "&client_secret=" +
        client_secret,
      {
        withCredentials: false
      }
    );
  }
};
