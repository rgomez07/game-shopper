import axios from 'axios';
// action type
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const GET_CART = 'GET_CART';
const ADD_CART_PRODUCT = 'ADD_CART_PRODUCT';
const CART_CHECKOUT = 'CART_CHECKOUT';
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
const cartCheckout = (oldOrder) => ({
  type: CART_CHECKOUT,
  oldOrder,
});
// thunks
export const deleteCartItem = (orderId, productId, history) => {
  return async (dispatch) => {
    try {
      const { data: cartItem } = await axios.delete(
        `/api/cart/${orderId}/${productId}`
      );
      dispatch(deleteCartProduct(cartItem));
      //history.push(`/users/cart/${orderId}`);
      dispatch(fetchCart(orderId));
    } catch (err) {
      console.log('error deleting item from cart', err);
    }
  };
};
export const addCartItem = (order) => {
  return async (dispatch) => {
    try {
      console.log('herrre orderuserid', order);
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

export const checkOut = (order, history) => {
  return async (dispatch) => {
    try {
      console.log('here', order);
      const { data: oldOrder } = await axios.put(
        `/api/cart/users/${order}/checkout`
      );
      dispatch(cartCheckout(oldOrder));
      history.push(`/Checkout`);
    } catch (error) {
      console.log(error);
    }
  };
};
//Reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case DELETE_PRODUCT:
      return action.product.products;
    case GET_CART:
      return action.cart;
    case ADD_CART_PRODUCT:
      return [...state, action.product];
    case CART_CHECKOUT:
      return action.oldOrder;

    default:
      return state;
  }
}
