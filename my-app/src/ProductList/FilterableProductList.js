import React from "react";
import SearchBox from "./SearchBox";
import { ProductTable } from "./ProductTable";
let product = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football"
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball"
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball"
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch"
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5"
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7"
  }
];

export default class FilterableProductList extends React.Component {
  constructor(props) {
    super(props);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.state = { filteredProduct: product, searchText: "", inStock: false };
  }
  onFilterChange(e) {
    if (e.target.name === "isStock") {
      let checked = e.target.checked;
      this.setState({ inStock: checked }, () => {
        if (checked) {
          let filteredProduct = product.filter(item => {
            return (
              (item.name.includes(this.state.searchText) ||
                this.state.searchText.length === 0) &&
              item.stocked
            );
          });
          this.setState({
            filteredProduct: filteredProduct
          });
        } else {
          this.setState({
            filteredProduct: product
          });
        }
      });
    } else {
      this.setState({ searchText: e.target.value }, () => {
        let filteredProduct = product.filter(item => {
          return (
            (item.name.includes(this.state.searchText) ||
              this.state.searchText.length === 0) &&
            (!this.state.inStock || item.stocked)
          );
        });
        this.setState({
          filteredProduct: filteredProduct
        });
      });
    }
  }
  render() {
    return (
      <div>
        {this.state.searchText}
        <SearchBox
          searchText={this.state.searchText}
          inStock={this.state.inStock}
          onSearchTextChange={this.onFilterChange}
          onIsStockChange={this.onFilterChange}
        />
        <ProductTable productList={this.state.filteredProduct} />
      </div>
    );
  }
}
