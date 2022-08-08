import React from 'react';
import { connect } from 'react-redux';
import Product from '../../server/db/models/Products';
//import { fetchProducts } from '../../store/products';

const fakeData = [
  {
    name: 'COD',
    price: '200',
    image:
      'https://media.rawg.io/media/games/2c1/2c1984e128ac48b89953ed4de4904a3b.jpg',
  },
  {
    name: 'game',
    price: '100',
    image:
      'https://media.rawg.io/media/games/99e/99e937e4cc518d641317116c9d8d9046.jpg',
  },
];
export class CartView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  render(error) {
    if (error) {
      return <h3 className="textColor">No cart at this time</h3>;
    } else {
      return (
        <div className="textColor">
          <div id="products" className="list">
            {this.state.products.length ? (
              <div>
                <h2>Items in your cart</h2>
                {this.state.products.map((prod) => {
                  return(
                    <Product
                    key= {prod.id}
                    product={prod}
                  )
                  })}
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
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDispatch)(CartView);
