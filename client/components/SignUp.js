import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../store/signup';

/**
 * COMPONENT
 */
class SignUp extends React.Component {
  render() {
    const { name, displayName, handleSubmit, error } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small className="textColor">Username</small>
            </label>
            <input name="username" type="text" className="label" />
          </div>
          <div>
            <label htmlFor="password">
              <small className="textColor">Password</small>
            </label>
            <input name="password" type="password" className="label" />
          </div>
          <div>
            <label htmlFor="email">
              <small className="textColor">Email</small>
            </label>
            <input name="email" type="text" className="label" />
          </div>
          <div>
            <button className="btn" type="submit">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
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

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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
      const email = evt.target.email.value;

      dispatch(signup(username, password, email, formName));
    },
  };
};

export default connect(mapSignup, mapDispatch)(SignUp);
