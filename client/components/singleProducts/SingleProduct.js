import React from "react";
import { fetchSingleProduct } from "../../store/singleProduct";
import { connect } from "react-redux";
import NotFound from "../NotFound";

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.id);
    console.log("this is this.props", this.props);
  }

  render() {
    const product = this.props.singleProduct;
    return (
      <div>
        {product.name ? (
          <div>
            <h2>{product.name}</h2>
            <img src={product.image} />
            <h3>${product.price / 100}</h3>
            <body>
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
            </body>
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

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (id) => dispatch(fetchSingleProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
