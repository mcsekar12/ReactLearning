import axios from "axios";

export default {
  getGithubUserRepo(userName) {
    let clientId = "";
    let client_secret = "";
    return axios.get(
      "https://api.github.com/users/" +
        userName +
        "/repos" +
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
