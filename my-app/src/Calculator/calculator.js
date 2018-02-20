import React from "react";
import BoilingVerdict from "./BoilingVerdict";
import TemperatureInput from "./TemperatureInput";
import Counter from "../Counter/Counter";
import CounterRedux from "../Counter/CounterRedux";
import CounterCustomRedux from "../Counter/CounterCustomRedux";
import "./calculator.css";

import { Provider } from "react-redux";
import { createStore } from "redux";

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
const store = createStore(counter);

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celcius) {
  return celcius * 9 / 5 + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounted = Math.round(output * 1000) / 1000;
  return rounted.toString();
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }
  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const temperature = this.state.temperature;
    const celsius =
      this.state.scale === "f"
        ? tryConvert(temperature, toCelsius)
        : this.state.temperature;
    const fahrenheit =
      this.state.scale === "c"
        ? tryConvert(temperature, toFahrenheit)
        : this.state.temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(temperature)} />

        <Counter />

        <CounterCustomRedux />

        <Provider store={store}>
          <CounterRedux />
        </Provider>

        <Provider store={store}>
          <CounterRedux />
        </Provider>
      </div>
    );
  }
}

export default Calculator;
