import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, me } from '../store/auth';
import { fetchUser } from '../../store/users';
export class Navbar extends React.Component {
  componentDidMount() {
    this.props.current(), this.props.handleClick(), this.props.fetchUsers();
  }
  render() {
    {
      console.log('NAVBAR PROPS -->', this.props.userType);
    }
    return (
      <div>
        <h1 className='pageTitle'>Game Shopper</h1>
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to='/home' className='textColor'>
                Home
              </Link>
              <a
                href='#'
                onClick={this.props.handleClick}
                className='textColor'>
                Logout
              </a>
              <Link to='/users' className='textColor'>
                Users
              </Link>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to='/login' className='textColor'>
                Login
              </Link>
              <Link to='/signup' className='textColor'>
                Sign Up
              </Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userType: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    current() {
      dispatch(me());
    },
    fetchUser() {
      dispatch(fetchUser());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
