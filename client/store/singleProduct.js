import axios from 'axios';

//Action types
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

//Action creators
export const setSingleProduct= (product) => ({
  type: SET_SINGLE_PRODUCT,
  product,
});

export const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    id,
});

//Thunk creators
export const fetchSingleProduct = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/product/${id}`);
  dispatch(setSingleProduct(data));
};
export const toDeleteProduct = (id, history) => async (dispatch) => {
    await axios
      .delete(`/api/products/${id}`)
      .then(() => dispatch(deleteProduct(id)));
    history.push('/products');
  };

//Reducer
export default function singleProductReducer(state = {}, action) {
    switch (action.type) {
        case SET_SINGLE_PRODUCT:
            return action.product;
        case DELETE_PRODUCT:
            return {...state}.filter((productState) => productState.id !== action.id);
        default:
            return state;
    }
}