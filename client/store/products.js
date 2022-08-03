import axios from "axios";

// action types
const GET_PRODUCTS = "GET_PRODUCTS";

// action creators

export const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};


// thunk(s)
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(getProducts(data))
    } catch (err) {
      console.log('error fetching products', err) // including this to help us trace where the failure(s) occur
    }
  }
}

const initialState = {};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
