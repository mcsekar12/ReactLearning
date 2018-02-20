import React, { Component } from "react";
import Todo from "./Todo";

import { createStore } from "redux";
import { Provider } from "react-redux";
// import { combineReducers } from "redux";

const todo = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    }
    case "TOGGLE_ITEM": {
      if (state.id !== action.itemIndex) {
        return state;
      }
      return { ...state, completed: !state.completed };
    }
    default: {
      return state;
    }
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_STATE": {
      return action.filter;
    }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      action.id = state.length;
      return [...state, todo(undefined, action)];
    case "TOGGLE_ITEM":
      return state.map((item, index) => todo(item, action));
    default:
      return state;
  }
};

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);

      return nextState;
    }, {});
  };
};

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

// const todoApp = (state = {}, action) => {
//   return {
//     list: todos(state.list, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.list = store.getState().todos;
    this.state.visibilityFilter = store.getState().visibilityFilter;
    store.subscribe(() => {
      this.setState({
        list: store.getState().todos,
        visibilityFilter: store.getState().visibilityFilter
      });
    });
  }
  render() {
    return (
      <div>
        {/* <Provider store={store}>
          <Todo />
        </Provider> */}

        <Todo
          list={this.state.list}
          visibilityFilter={this.state.visibilityFilter}
          dispatch={store.dispatch}
        />
      </div>
    );
  }
}
