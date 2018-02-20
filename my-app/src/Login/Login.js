import React from "react";
import { fakeAuth } from "../PrivateRoute";
import { Redirect } from "react-router-dom";

export default class Login extends React.Component {
  state = { redirectToReferrer: false };
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  };
  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}