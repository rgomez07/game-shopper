import React from 'react';
import { fetchCart } from '../store/cart';
import { connect } from 'react-redux';

export class DisplayCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.id);
    //console.log('this is this.props', this.props);
  }

  render() {
    const userCart = this.props.cart;

    console.log('heeerrree----', userCart);
    return (
      <div className="textColor">
        <div id="products" className="list">
          {userCart.length ? (
            <div>
              <h2>Your Cart is:</h2>
              {userCart.map((product) => (
                <div key={product.id}>
                  <img className="" src={product.image} />
                  {product.name}
                </div>
              ))}
            </div>
          ) : (
            <h2 className="textColor">Your Cart is empty</h2>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cartReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
  };
};

export default connect(mapState, mapDispatch)(DisplayCart);
