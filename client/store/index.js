import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import singleProductReducer from './singleProduct';
import singleUserReducer from './singleUser';
import userListReducer from './users';
import productsReducer from './products';
import cartReducer from './cart';

const reducer = combineReducers({ auth, singleProductReducer, singleUserReducer, userListReducer, productsReducer, cartReducer });
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
