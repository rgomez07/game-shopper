import axios from 'axios';

// action type
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const GET_CART = 'GET_CART';

// action creator(s)
export const deleteCartProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});
export const getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

// thunks
export const deleteCartItem = (productId, history) => {
  return async (dispatch) => {
    try {
      const { data: cartItem } = await axios.delete(`/api/cart/${productId}`);
      dispatch(_deleteStudent(cartItem));
    } catch (err) {
      console.log('error deleting item from cart', err);
    }
  };
};

export const fetchCart = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/cart/${id}`);
  dispatch(getCart(data));
};

//Reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      return state.filter((cartProduct) => {
        return cartProduct.id !== action.product.id;
      });
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
