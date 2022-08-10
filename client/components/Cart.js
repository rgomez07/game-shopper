import React from 'react';
import { fetchCart, deleteCartItem, checkOut } from '../store/cart';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
export class DisplayCart extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart(this.props.match.params.id);
    //console.log(‘this is this.props’, this.props)
  }

  handleClick(evt) {
    evt.preventDefault();
    this.props.checkOut(this.props.match.params.id);
  }
  render() {
    const userCart = this.props.cart;
    console.log('heeerrree----', this.props);
    return (
      <div className="textColor">
        <div id="products" className="list">
          {userCart.length ? (
            <div>
              <h2>Your Cart is:</h2>
              {userCart.map((product) => (
                <div key={product.id}>
                  <div>{product.name}</div>
                  <div>
                    Quantity:{' '}
                    {product.order_product.quantity &&
                      product.order_product.quantity}
                  </div>
                  <img className="" src={product.image} />
                  {console.log(product)}
                  <form onSubmit={(event) => event.preventDefault()}>
                    <button
                      type="submit"
                      className="remove"
                      onClick={() =>
                        this.props.deleteCartItem(
                          product.order_product.orderId,
                          product.order_product.productId
                        )
                      }
                    >
                      Delete
                    </button>
                  </form>
                  <br />
                </div>
              ))}{' '}
              <button type="submit" onClick={this.handleClick}>
                Checkout
              </button>
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
const mapDispatch = (dispatch, { history }) => {
  return {
    fetchCart: (id) => dispatch(fetchCart(id)),
    deleteCartItem: (orderId, productId) =>
      dispatch(deleteCartItem(orderId, productId, history)),
    checkOut: (id) => dispatch(checkOut(id)),
  };
};
export default connect(mapState, mapDispatch)(DisplayCart);
