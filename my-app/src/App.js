import React, { Component } from "react";
import "./App.css";
import Calculator from "./Calculator/calculator";
import FilterableProductList from "./ProductList/FilterableProductList";
import { Route, Switch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute";
import AuthButton from "./Login/AuthButton";
import GithubSearch from "./GithubSearch/GithubSearch";
import Todos from "./Todos/Todos";

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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <nav>
          <ul>
            <li>
              <NavLink to="/temperature" className="primary__nav">
                Calculator
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" className="primary__nav">
                product
              </NavLink>
            </li>
            <li>
              <NavLink to="/github" className="primary__nav">
                Github
              </NavLink>
            </li>
            <li>
              <NavLink to="/todo" className="primary__nav">
                Todo
              </NavLink>
            </li>
            <li>
              <AuthButton />
            </li>
          </ul>
        </nav>
        <div>
          <div>
            <Switch>
              <Route exact path="/" component={Calculator} />
              <Route path="/temperature" component={Calculator} />
              <PrivateRoute path="/product" component={FilterableProductList} />
              <Route path="/github" component={GithubSearch} />
              <Route path="/todo" component={Todos} />
              <Route path="/login" component={Login} />
            </Switch>
            {/* <Route path="/temperature" component={Calculator} />
              <Route path="/product" component={FilterableProductList} /> */}
          </div>

          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
