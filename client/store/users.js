import axios from 'axios';

//Action types
const SET_USERS = 'SET_USERS';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';

//Action creators
export const setUser = (users) => ({
  type: SET_USERS,
  users,
});

export const addUser = (user) => ({
  type: ADD_USER,
  user,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  id,
});

// Thunk creators
export const fetchUser = () => async (dispatch) => {
  const { data } = await axios.get('/api/users');
  dispatch(setUser(data));
};

export const toAddUser = (userList, history) => async (dispatch) => {
  await axios.post('/api/users', userList);
  dispatch(addUser(userList));
  history.push('/users');
};
export const toDeleteUser = (id, history) => async (dispatch) => {
  try{
  await axios
    .delete(`/api/users/${id}`)
    .then(() => dispatch(deleteUser(id)));
    history.push('/users');
  } catch (err) {
    console.log('error deleting user',err)
  }
};
//Reducer
export default function userListReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
      case DELETE_USER:
        return [...state].filter((userState) => userState.id !== action.id);
      default:
      return state;
    }
  }
