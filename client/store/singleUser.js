import axios from "axios";

//Action types
const SET_SINGLE_USER = "SET_SINGLE_USER";
const UPDATE_USER = "UPDATE_USER";

//Action creators
export const setSingleUser = (user) => ({
  type: SET_SINGLE_USER,
  user,
});

export const updateSingleUser = (user) => ({
  type: UPDATE_USER,
  user,
});

//Thunk creators
export const fetchSingleUser = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/${id}`);
  dispatch(setSingleUser(data));
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, user);
      dispatch(updateSingleUser(data));
      history.push("/home");
    } catch (err) {
      console.log("error updating user", err);
    }
  };
};

//Reducer
export default function singleUserReducer(state = {}, action) {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.user;
    case UPDATE_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
