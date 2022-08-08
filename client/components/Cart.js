import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';
export const fakeData = [
  {
    name: 'COD',
    price: '200',
    image:
      'https://media.rawg.io/media/games/2c1/2c1984e128ac48b89953ed4de4904a3b.jpg',
    id: 1,
  },
  {
    name: 'game',
    price: '100',
    image:
      'https://media.rawg.io/media/games/99e/99e937e4cc518d641317116c9d8d9046.jpg',
    id: 2,
  },
];

export class DisplayCart extends React.Component {
  componentDidMount() {
    this.props.fetchCart(this.props.match.params.id);
    console.log('heeerrree----', this.props.cart);
  }

  render() {
    console.log('heeerrree----', this.props.cart);
    return (
      <div className="textColor">
        <div id="products" className="list">
          {fakeData.length ? (
            <div>
              <h2>Your Cart</h2>
              {fakeData.map((product) => (
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
