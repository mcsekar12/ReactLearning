import React, { Component } from "react";
import { connect } from "react-redux";
import "./Todo.css";
var classNames = require("classnames");

class Todo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addItemText: "",
      filters: [
        { label: "All", value: "SHOW_ALL" },
        { label: "Completed", value: "COMPLETED" },
        { label: "Active", value: "ACTIVE" }
      ]
    };
    this.addItemChange = this.addItemChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  addItem() {
    this.props.dispatch({ type: "ADD_ITEM", text: this.state.addItemText });
    this.setState({ addItemText: "" });
  }
  addItemChange(e) {
    this.setState({
      addItemText: e.target.value
    });
  }
  toggleCompleted(itemIndex) {
    this.props.dispatch({ type: "TOGGLE_ITEM", itemIndex: itemIndex });
  }
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.addItem();
    }
  }
  changeFilter(filter) {
    this.props.dispatch({ type: "SET_VISIBILITY_STATE", filter: filter });
  }
  render() {
    let todoList = "";
    let todos = this.props.list.filter(item => {
      if (this.props.visibilityFilter === "SHOW_ALL")
        return item.completed || !item.completed;
      else if (this.props.visibilityFilter === "COMPLETED")
        return item.completed;
      else return !item.completed;
    });
    if (todos.length > 0) {
      todoList = todos.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => this.toggleCompleted(index)}
            className={item.completed ? "completed" : ""}
          >
            {item.text}
          </li>
        );
      });
    } else {
      todoList = <li>No items added...</li>;
    }

    let filters = this.state.filters.map(filter => {
      let filterClass = classNames({
        filter: true,
        filter__active: this.props.visibilityFilter === filter.value
      });
      return (
        <span
          key={filter.value}
          className={filterClass}
          onClick={() => {
            this.changeFilter(filter.value);
          }}
        >
          {filter.label}
        </span>
      );
    });

    return (
      <div className="todo__cont">
        <div>Todo </div>
        <div>
          <input
            type="text"
            value={this.state.addItemText}
            onChange={this.addItemChange}
            onKeyPress={this.handleKeyPress}
          />
        </div>

        <ul className="todo__list">{todoList}</ul>
        <div className="filter__cont">{filters}</div>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { list: state.todos, visibilityFilter: state.visibilityFilter };
// }
// export default connect(mapStateToProps)(Todo);

export default Todo;
