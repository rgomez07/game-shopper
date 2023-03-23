import React from 'react';
import { connect } from 'react-redux';
import { login } from '../store/auth';
import NotLoggedInProducts from './products/NotLoggedInProducts';

/**
 * COMPONENT
 */
class Login extends React.Component {
  render() {
    const { name, displayName, handleSubmit, error } = this.props;
    console.log(this.props);
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor='username'>
              <small className='textColor'>Username</small>
            </label>
            <input name='username' type='text' className='label' />
          </div>
          <div>
            <label htmlFor='password'>
              <small className='textColor'>Password</small>
            </label>
            <input name='password' type='password' className='label' />
          </div>
          <div>
            <button className='btn' type='submit'>
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <br />
        <br />
        <NotLoggedInProducts />
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;

      dispatch(login(username, password, formName));
    },
  };
};

export default connect(mapLogin, mapDispatch)(Login);
