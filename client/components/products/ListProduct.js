import React from 'react';
import { Link } from 'react-router-dom';

class ListProduct extends React.Component {
  render() {
    const { products, user } = this.props;

    console.log('herrreee listproduct', this.props);
    return (
      <div>
        <Link to={`/products/${products.id}/users/${user.id}`}>
          <img src={products.image} />
          <h3 className="allProductViewName">{products.name}</h3>
        </Link>
        <h4 className="list-product">${products.price / 100}</h4>
        <h4 id="description" className="list-product">
          Description
        </h4>
        <div className="list-product">{products.description}</div>

        <br />
        <hr />
        <br />
      </div>
    );
  }
}
export default ListProduct;
