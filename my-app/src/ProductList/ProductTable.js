import React from "react";

export class ProductTable extends React.Component {
  render() {
    let items = this.props.productList;

    let products = {};
    items.forEach(element => {
      let category = element.category;
      products[category]
        ? products[category]["items"].push(element)
        : (products[category] = { items: [element], name: element.category });
    });
    const listItems = Object.keys(products).map((item, index) => {
      return (
        <div>
          <ProductTitle title={products[item].name} />
          {products[item].items.map(pro => {
            return <ProductRow name={pro.name} price={pro.price} />;
          })}
        </div>
      );
    });
    return (
      <div>
        <div className="productRow">
          <span>Name</span> <span>Price</span>
          {listItems}
        </div>
      </div>
    );
  }
}

export class ProductTitle extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

export class ProductRow extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.price}</div>
      </div>
    );
  }
}
