import React from 'react';
import { Link } from 'react-router-dom';

class ListProduct extends React.Component {
  render() {
    const { products, user } = this.props;

    return (
      <div className='NLIcontainer'>
        <div className='upperInnerBox'>
          <Link to={`/products/${products.id}/users/${user.id}`}>
            <img src={products.image} />
          </Link>
        </div>
        <div className='bottomInnerBox'>
          <div>
            <Link to={`/products/${products.id}/users/${user.id}`}>
              <span className='title'>{products.name}</span>
            </Link>
          </div>
          <div className='description'>
            <h4>Description</h4>
            {products.description}
          </div>
          <div className='price'>
            <h4>${products.price / 100}</h4>
          </div>
        </div>
      </div>
    );
  }
}
export default ListProduct;
