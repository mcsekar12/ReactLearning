import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState((prevState, props) => {
      return { value: prevState.value + 1 };
    });
  }
  decrement() {
    this.setState((prevState, props) => {
      return { value: prevState.value - 1 };
    });
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

export default Counter;
