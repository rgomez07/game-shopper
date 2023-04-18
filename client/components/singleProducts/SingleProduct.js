import React from 'react';
import { fetchSingleProduct } from '../../store/singleProduct';
import { addCartItem } from '../../store/cart';
import { connect } from 'react-redux';
import NotFound from '../NotFound';

class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId,
      id: this.props.match.params.id,
      unit_price: this.props.singleProduct.price,
      //quantity:1,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
  }
  handleClick(evt) {
    evt.preventDefault();
    this.props.addCartItem(this.state);
    setTimeout(() => {
      alert('Product added to cart!');
    }, 100);
    console.log('this.state in single product', this.state);
  }

  render() {
    const product = this.props.singleProduct;
    return (
      <div>
        {product.name ? (
          <div className='textColor'>
            <h2>{product.name}</h2>
            <div>
              <img src={product.image} />
            </div>
            <button
              className='addToCartBtn'
              type='submit'
              onClick={this.handleClick}
            >
              Add To Cart
            </button>
            <h3>${product.price / 100}</h3>
            <b>Platform:</b> {product.platform}
            <br />
            <br />
            <b>Description:</b> {product.description}
            <br />
            <br />
            <b>ESRB:</b> {product.esrb} <br />
            <br />
            {product.multiplayer ? (
              <b>Supports multiplayer</b>
            ) : (
              <b>Does not support multiplayer</b>
            )}
            <br />
            <br />
            <b>Metacritic Rating:</b> {product.rating}/100
            <br />
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
