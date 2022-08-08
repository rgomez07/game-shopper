import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
<<<<<<< HEAD
import { logout, me } from '../store/auth';
export class Navbar extends React.Component {
  componentDidMount() {
    this.props.current(), this.props.handleClick();
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
              {this.props.userType === 'Admin' ? (
                <Link to='/users' className='textColor'>
                  Users
                </Link>
              ) : null}
              <Link to={`/users/cart/${id}`} className="cartTextColor">
            <FiShoppingCart />
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
              <Link to={`/users/cart/${id}`} className="cartTextColor">
            <FiShoppingCart />
          </Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    );
  }
}
=======
import { logout } from '../store';
import { FiShoppingCart } from 'react-icons/fi';

const Navbar = ({ handleClick, isLoggedIn, id }) => (
  <div>
    <Link to="/home" className="textColor">
      <h1 className="pageTitle">Game Shopper</h1>
    </Link>

    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="textColor">
            Home
          </Link>
          <a href="#" onClick={handleClick} className="textColor">
            Logout
          </a>
          <Link to="/users" className="textColor">
            Users
          </Link>
          <Link to={`/users/${id}/profile`} className="textColor">
            Profile
          </Link>
          <Link to={`/users/cart/${id}`} className="cartTextColor">
            <FiShoppingCart />
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="textColor">
            Login
          </Link>
          <Link to="/signup" className="textColor">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);
>>>>>>> 51837830fdc77ceb1384b83df0c57c2b1bc8ee6b

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
