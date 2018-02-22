import React from "react";
import Todo from "./Todo";
import { store } from "./TodoStore";
import { Provider } from "react-redux";

const Todos = () => (
  <Provider store={store}>
    <Todo />
  </Provider>
);
export default Todos;
