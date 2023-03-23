import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../store/products';
import NLIListProduct from './NLIListProduct';

export class NotLoggedInProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render(error) {
    if (error) {
      return <h3 className='textColor'>No products available at this time</h3>;
    } else {
      return (
        <div className='textColor'>
          {this.props.products.length ? (
            <div className='NLITitle'>
              <h2>All Fun and Games</h2>
              <div className='outerDiv'>
                {this.props.products.map((product) => (
                  <NLIListProduct products={product} key={product.id} />
                ))}
              </div>
            </div>
          ) : (
            <h2 className='textColor'>
              there are no games to display currently
            </h2>
          )}
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    products: state.productsReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(NotLoggedInProducts);
