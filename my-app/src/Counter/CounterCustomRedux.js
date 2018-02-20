import React, { Component } from "react";

let counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      return state;
  }
};

class CounterRedux extends Component {
  state = counter(undefined, {});
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  dispatch(action) {
    this.setState(prevState => counter(prevState, action));
  }

  increment() {
    this.dispatch({ type: "INCREMENT" });
  }
  decrement() {
    this.dispatch({ type: "DECREMENT" });
  }

  render() {
    return (
      <div>
        <button onClick={this.increment}>+</button>
        {this.state.value}
        <button onClick={this.decrement}>-</button>{" "}
      </div>
    );
  }
}

export default CounterRedux;
