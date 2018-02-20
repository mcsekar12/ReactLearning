import React from "react";
import GithubSearchBox from "./GithubSearchBox";
import GithubSearchAPI from "./GithubSearchAPI";
import GithubUserCard from "./GithubUserCard";
import GithubUserRepo from "./GithubUserRepo";

export default class GithubSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      userInfo: [],
      loading: false,
      error: false,
      errorMsg: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ searchText: event.target.value }, () => {
      this.setState({
        loading: true,
        userInfo: [],
        error: false,
        errorMsg: ""
      });
      GithubSearchAPI.getGithubUser(this.state.searchText)
        .then(res => {
          this.setState({ userInfo: res.data, loading: false });
        })
        .catch(err => {
          let message =
            err.response.data.message || "Error in fetching repo info";
          this.setState({
            userInfo: [],
            loading: false,
            error: true,
            errorMsg: message
          });
        });
    });
  }

  render() {
    let userCard = "";
    if (this.state.loading) {
      userCard = <div>Loading...</div>;
    } else if (this.state.userInfo.login) {
      userCard = <GithubUserCard userInfo={this.state.userInfo} />;
    } else if (this.state.error) {
      userCard = <div>{this.state.errorMsg}</div>;
    } else {
      userCard = <div>No user found</div>;
    }
    let userRepo = <GithubUserRepo user={this.state.searchText} />;
    return (
      <div>
        <div>Github Search</div>
        <GithubSearchBox
          searchText={this.state.searchText}
          handleChange={this.handleChange}
        />
        {userCard}
        {userRepo}
      </div>
    );
  }
}
