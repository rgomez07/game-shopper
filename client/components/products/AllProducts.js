import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../store/products';
import ListProduct from './ListProduct';

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render(error) {
    console.log('this is allproductporps', this.props);
    if (error) {
      return <h3 className="textColor">No products available at this time</h3>;
    } else {
      return (
        <div className="textColor">
          <div id="products" className="list">
            {this.props.products.length ? (
              <div>
                <h2>Check out these awesome games</h2>
                {this.props.products.map((product) => (
                  <ListProduct
                    products={product}
                    key={product.id}
                    user={this.props.user}
                  />
                ))}
              </div>
            ) : (
              <h2 className="textColor">
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

export default connect(mapState, mapDispatch)(AllProducts);
