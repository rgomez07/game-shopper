import React from 'react';
import { Link } from 'react-router-dom';

class NLIListProduct extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <div className='NLIcontainer'>
        <Link to={`/products/${products.id}`}>
          <img src={products.image} className='gamePics' />
          <h3 className='allProductViewName'>{products.name}</h3>
        </Link>
        <h4 className='list-product'>${products.price / 100}</h4>
        <h4 id='description' className='list-product'>
          Description
        </h4>
        <div className='description'>{products.description}</div>
        <br />
        {/* <hr /> */}
        <br />
      </div>
    );
  }
}
export default NLIListProduct;
