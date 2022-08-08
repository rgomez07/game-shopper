import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';


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

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    id: state.auth.id,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
