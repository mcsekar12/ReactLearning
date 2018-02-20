import React, { Component } from "react";
import { connect } from "react-redux";

class CounterRedux extends Component {
  constructor(props) {
    super(props);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }
  increment() {
    this.props.dispatch({ type: "INCREMENT" });
  }
  decrement() {
    this.props.dispatch({ type: "DECREMENT" });
  }

  render() {
    return (
      <div>
        <button onClick={this.increment}>+</button>
        {this.props.value}
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { value: state.value };
}

export default connect(mapStateToProps)(CounterRedux);
