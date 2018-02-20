import React from "react";
import GithubUserRepoAPI from "./GithubUserRepoAPI";
import "./GithubUserRepo.css";

export default class GithubUserRepo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repoInfo: [],
      loading: false,
      error: false,
      errorMsg: "Error in fetching data.Try again"
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ repoInfo: [], loading: true, error: false });
    GithubUserRepoAPI.getGithubUserRepo(props.user)
      .then(res => {
        this.setState({
          repoInfo: res.data,
          loading: false,
          error: false
        });
      })
      .catch(err => {
        let message =
          err.response.data.message || "Error in fetching repo info";
        this.setState({
          repoInfo: [],
          loading: false,
          error: true,
          errorMsg: message
        });
      });
  }

  render() {
    let repoInfo = "";
    let repoList = this.state.repoInfo;

    if (this.state.loading) {
      repoInfo = <div>Loading...</div>;
    } else if (this.state.error) {
      repoInfo = <div>{this.state.errorMsg}</div>;
    } else if (repoList.length > 0) {
      repoInfo = repoList.map(repo => {
        return (
          <li>
            <div className="repo__info">
              <div>{repo.name}</div>

              <div className="fork__info">{repo.forks} forks</div>
            </div>
          </li>
        );
      });
    } else {
      repoInfo = <div>No repos found.</div>;
    }
    return (
      <div>
        <div className="title">Github User Repo</div>
        <ul className="repo__list">{repoInfo}</ul>
      </div>
    );
  }
}
