import React from "react";
import "./GithubUserCard.css";

export default class GithubUserCard extends React.Component {
  render() {
    return (
      <div className="github__user__card">
        <div className="user__pic">
          <img src={this.props.userInfo.avatar_url} alt="pic" />
        </div>

        <div className="repo__info">
          <div className="user__fullname">
            {this.props.userInfo.name}
            <span className="user__name">@{this.props.userInfo.login}</span>
          </div>
          <span className="repo__count">
            {this.props.userInfo.public_repos} repositories
          </span>
          <span className="follow__count">
            {this.props.userInfo.followers} followers
          </span>
        </div>
      </div>
    );
  }
}
