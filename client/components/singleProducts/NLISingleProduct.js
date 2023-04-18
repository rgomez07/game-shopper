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
              <div className='singleViewTopInfo'>
                <h1 className='pageTitle'>{product.name}</h1>
                <h3>${product.price / 100}</h3>
              </div>
              <div className='singleViewBottomInfo'>
                <b>Platform:</b> {product.platform}
                <br />
                <br />
                <b>Description:</b> {product.description}
                <br />
                <br />
                <b>ESRB:</b> {product.esrb} <br />
                {product.multiplayer ? (
                  <h4>Supports multiplayer</h4>
                ) : (
                  <h4>Does not support multiplayer</h4>
                )}
                <h4>Metacritic Rating:</h4> {product.rating}/100
                <br />
              </div>
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
