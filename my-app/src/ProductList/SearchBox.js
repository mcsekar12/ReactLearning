import React from "react";

export default class SearchBox extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.searchText}
          onChange={this.props.onSearchTextChange}
          name="search"
        />
        <input
          type="checkbox"
          checked={this.props.inStock}
          onChange={this.props.onIsStockChange}
          name="isStock"
        />{" "}
        Only show products in stock
      </div>
    );
  }
}
