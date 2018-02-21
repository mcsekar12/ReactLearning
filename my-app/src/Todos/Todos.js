import React, { Component } from "react";
import Todo from "./Todo";
import { store } from "./TodoStore";
import PropTypes from "prop-types";

const Todos = () => (
  <Provider store={store}>
    <Todo />
  </Provider>
);

class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }
}
Provider.childContextTypes = {
  store: PropTypes.object
};
export default Todos;
