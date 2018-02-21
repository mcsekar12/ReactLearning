import React, { Component } from "react";
import "./Todo.css";
import PropTypes from "prop-types";

var classNames = require("classnames");

function getFilteredTodo(list = [], visibilityFilter) {
  return list.filter(item => {
    if (visibilityFilter === "SHOW_ALL")
      return item.completed || !item.completed;
    else if (visibilityFilter === "COMPLETED") return item.completed;
    else return !item.completed;
  });
}

class VisibleTodo extends Component {
  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnMount() {
    this.unsubscribe();
  }

  render() {
    let { store } = this.context;
    let state = store.getState();
    const list = getFilteredTodo(state.todos, state.visibilityFilter);
    return (
      <TodoList
        list={list}
        toggleCompleted={id => {
          store.dispatch({ type: "TOGGLE_ITEM", id: id });
        }}
      />
    );
  }
}

VisibleTodo.contextTypes = {
  store: PropTypes.object
};

const TodoItem = ({ onClick, completed, text }) => {
  return (
    <li onClick={onClick} className={completed ? "completed" : ""}>
      {text}
    </li>
  );
};

const TodoList = props => {
  let todoList = "";
  if (props.list.length > 0) {
    todoList = props.list.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          text={todo.text}
          completed={todo.completed}
          onClick={() => {
            props.toggleCompleted(todo.id);
          }}
        />
      );
    });
  } else {
    todoList = <li>No items found.</li>;
  }
  return <ul className="todo__list">{todoList}</ul>;
};

const AddToDo = (props, { store }) => {
  let input;

  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
        type="text"
        onKeyPress={e => {
          if (e.key === "Enter") {
            store.dispatch({ type: "ADD_ITEM", text: input.value });
            input.value = "";
          }
        }}
      />
    </div>
  );
};

AddToDo.contextTypes = {
  store: PropTypes.object
};

const Footer = props => {
  let filterList = [
    { label: "All", value: "SHOW_ALL" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Active", value: "ACTIVE" }
  ];
  let filters = filterList.map(filter => {
    return (
      <FilterLink key={filter.value} value={filter.value}>
        {filter.label}
      </FilterLink>
    );
  });
  return <div className="filter__cont">{filters}</div>;
};

const Todo = () => {
  return (
    <div className="todo__cont">
      <div>Todo </div>
      <AddToDo />
      <VisibleTodo />
      <Footer />
    </div>
  );
};

const Link = ({ value, children, active, ...props }) => {
  return (
    <button
      className={classNames({
        filter: true,
        filter__active: active
      })}
      onClick={e => {
        e.preventDefault();
        props.changeFilter(value);
      }}
    >
      {children}
    </button>
  );
};
class FilterLink extends Component {
  componentDidMount() {
    let { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }
  componentWillUnMount() {
    this.unsubscribe();
  }
  render() {
    let { store } = this.context;
    let state = store.getState();

    return (
      <Link
        active={state.visibilityFilter === this.props.value}
        value={this.props.value}
        changeFilter={filter => {
          store.dispatch({ type: "SET_VISIBILITY_STATE", filter: filter });
        }}
      >
        {this.props.children}
      </Link>
    );
  }
}

FilterLink.contextTypes = {
  store: PropTypes.object
};

export default Todo;
