import axios from 'axios';

// action type
const DELETE_PRODUCT = 'DELETE_PRODUCT'


// action creator(s)
export const deleteCartProduct = (product) => ({
  type: DELETE_PRODUCT,
  product
})

// thunks
export const deleteCartItem = (productId, history) => {
  return async (dispatch) => {
    try {
      const { data: cartItem } = await axios.delete(`/api/cart/${productId}`);
      dispatch(_deleteStudent(cartItem));
    } catch (err) {

      console.log("error deleting item from cart", err);
    }
  };
};


//Reducer
export default function cartReducer(state = {}, action) {
  switch (action.type) {
      case DELETE_PRODUCT:
        return state.filter((cartProduct) => {
          return cartProduct.id !== action.product.id
        })
      default:
          return state;
  }
}
