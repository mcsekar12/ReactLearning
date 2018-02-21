import React from "react";
// import { connect } from "react-redux";
import "./Todo.css";
var classNames = require("classnames");

function getFilteredTodo(list = [], visibilityFilter) {
  return list.filter(item => {
    if (visibilityFilter === "SHOW_ALL")
      return item.completed || !item.completed;
    else if (visibilityFilter === "COMPLETED") return item.completed;
    else return !item.completed;
  });
}

// function mapStateToProps(state) {
//   return { list: state.todos, visibilityFilter: state.visibilityFilter };
// }
// export default connect(mapStateToProps)(Todo);

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

const AddToDo = props => {
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
            props.addToDo(input.value);
            input.value = "";
          }
        }}
      />
    </div>
  );
};

const Footer = props => {
  let filterList = [
    { label: "All", value: "SHOW_ALL" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Active", value: "ACTIVE" }
  ];
  let filters = filterList.map(filter => {
    let filterClass = classNames({
      filter: true,
      filter__active: props.activeFilter === filter.value
    });
    return (
      <span key={filter.value} className={filterClass}>
        <FilterLink
          value={filter.value}
          changeFilter={() => {
            props.changeFilter(filter.value);
          }}
        >
          {filter.label}
        </FilterLink>
      </span>
    );
  });
  return <div className="filter__cont">{filters}</div>;
};

const FilterLink = ({ value, children, ...props }) => {
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        props.changeFilter(value);
      }}
    >
      {children}
    </a>
  );
};

const Todo = ({ list, visibilityFilter, ...props }) => {
  return (
    <div className="todo__cont">
      <div>Todo </div>
      <AddToDo
        addToDo={inputValue => {
          props.dispatch({ type: "ADD_ITEM", text: inputValue });
        }}
      />
      <TodoList
        list={getFilteredTodo(list, visibilityFilter)}
        toggleCompleted={id => {
          props.dispatch({ type: "TOGGLE_ITEM", id: id });
        }}
      />
      <Footer
        activeFilter={visibilityFilter}
        changeFilter={filter => {
          props.dispatch({
            type: "SET_VISIBILITY_STATE",
            filter: filter
          });
        }}
      />
    </div>
  );
};

export default Todo;
