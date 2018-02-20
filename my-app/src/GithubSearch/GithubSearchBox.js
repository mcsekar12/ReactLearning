import React from "react";

export default class GithubSearchBox extends React.Component {
  render() {
    return (
      <input
        placeholder="Search User"
        value={this.props.searchText}
        onChange={this.props.handleChange}
      />
    );
  }
}
