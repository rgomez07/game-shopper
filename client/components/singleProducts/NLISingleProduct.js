import React from 'react';
import { fetchSingleProduct } from '../../store/singleProduct';
import { addCartItem } from '../../store/cart';
import { connect } from 'react-redux';
import NotFound from '../NotFound';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }

  render() {
    const product = this.props.singleProduct;
    return (
      <div>
        {product.name ? (
          <div className='singleProductOuterDiv'>
            <div className='singleViewImage'>
              <img src={product.image} className='singleImage' />
            </div>
            <div className='singleViewInfo'>
              <h2>{product.name}</h2>
              <h3>${product.price / 100}</h3>
              <b>Platform:</b> {product.platform}
              <br />
              <br />
              <b>Description:</b> {product.description}
              <br />
              <br />
              <b>ESRB:</b> {product.esrb} <br />
              {product.multiplayer ? (
                <b>Supports multiplayer</b>
              ) : (
                <b>Does not support multiplayer</b>
              )}
              <b>Metacritic Rating:</b> {product.rating}/100
              <br />
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    singleProduct: state.singleProductReducer,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
    addCartItem: (product) => dispatch(addCartItem(product, history)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
