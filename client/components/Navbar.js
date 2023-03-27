import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, me } from '../store/auth';
import { fetchUser } from '../store/users';
import { FiShoppingCart } from 'react-icons/fi';
export class Navbar extends React.Component {
  componentDidMount() {
    this.props.current(), this.props.handleClick();
  }
  render() {
    return (
      <div>
        <Link to='/home' className='textColor'>
          <h1 className='pageTitle'>Game Shopper</h1>
        </Link>
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
                className='textColor'
              >
                Logout
              </a>
              <Link
                to={`/users/cart/${this.props.id}`}
                className='cartTextColor'
              >
                <FiShoppingCart />
              </Link>
              <Link
                to={`/users/${this.props.id}/profile`}
                className='pageTitle'
              >
                Profile
              </Link>
              {this.props.userType === 'Admin' ? (
                <Link to='/users' className='textColor'>
                  Users
                </Link>
              ) : null}
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
              <Link to='/products' className='textColor'>
                All Products
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
    id: state.auth.id,
    isLoggedIn: !!state.auth.id,
    userType: state.auth.userType,
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
  };
};

export default connect(mapState, mapDispatch)(Navbar);
