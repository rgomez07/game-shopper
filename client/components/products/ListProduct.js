import React from "react";
import { Link } from "react-router-dom";

class ListProduct extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <img src={products.image} />
        <h3>{products.name}</h3>
        <body>
          <h4 id="description">Description</h4>
          <div>{products.description}</div>
        </body>
        <br/>
        <hr/>
        <br/>
      </div>
    );
  }
}
export default ListProduct;
