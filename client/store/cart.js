import axios from 'axios';

// action type
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const GET_CART = 'GET_CART';
const ADD_CART_PRODUCT = 'ADD_CART_PRODUCT';

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
export const addCartProduct = (product) => ({
  type: ADD_CART_PRODUCT,
  product,
});

// thunks
export const deleteCartItem = (userId, productId, history) => {
  return async (dispatch) => {
    try {
      const { data: cartItem } = await axios.delete(
        `/api/cart/${userId}/${productId}`
      );
      dispatch(deleteCartProduct(cartItem));
      history.push(`/cart/${userId}`);
    } catch (err) {
      console.log('error deleting item from cart', err);
    }
  };
};
export const addCartItem = (order, history) => {
  return async (dispatch) => {
    try {
      const { data: cartItem } = await axios.put(
        `/api/cart/${order.userId}`,
        order
      );
      dispatch(addCartProduct(cartItem));
    } catch (err) {
      console.log('error adding item from cart', err);
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
    case ADD_CART_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
