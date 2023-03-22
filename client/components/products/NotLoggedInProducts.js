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
          <div id='products' className='list'>
            {this.props.products.length ? (
              <div>
                <h2>All Fun and Games</h2>
                <div className='NLIList'>
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
