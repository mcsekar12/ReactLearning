import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Calculator from "./Calculator/calculator";
import FilterableProductList from "./ProductList/FilterableProductList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { route: window.location.hash.substr(1) };
  }
  componentDidMount() {
    window.addEventListener("hashchange", () => {
      this.setState({
        route: window.location.hash.substr(1)
      });
    });
  }
  render() {
    let Child;
    switch (this.state.route) {
      case "/temperature":
        Child = Calculator;
        break;
      case "/product":
        Child = FilterableProductList;
        break;
      default:
        Child = Calculator;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <ul>
            <li>
              <a href="#/temperature">Calculate Temperature</a>
            </li>
            <li>
              <a href="#/product">Product</a>
            </li>
          </ul>
          <Child />
        </div>
      </div>
    );
  }
}

export default App;
