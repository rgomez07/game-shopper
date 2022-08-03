import axios from 'axios';

//Action types
const SET_SINGLE_USER = 'SET_SINGLE_USER';

//Action creators
export const setSingleUser= (user) => ({
  type: SET_SINGLE_USER,
  user,
});

//Thunk creators
export const fetchSingleUser = (id) => async (dispatch) => {
  const { data } = await axios.get(`/api/users/${id}`);
  dispatch(setSingleUser(data));
};

//Reducer
export default function singleUserReducer(state = {}, action) {
    switch (action.type) {
        case SET_SINGLE_USER:
            return action.user;
        default:
            return state;
    }
}