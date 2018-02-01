import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Calculator from "./Calculator/calculator";
import FilterableProductList from "./ProductList/FilterableProductList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Calculator />
        <FilterableProductList />
      </div>
    );
  }
}

export default App;
