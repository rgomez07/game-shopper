import React from 'react';
import { connect } from 'react-redux';
import AllProducts from './products/AllProducts';

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { user } = props;

  return (
    <>
      <div>
        <h2 className="textColor">Welcome, {user.username}</h2>
      </div>
      <AllProducts user={user} />
    </>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapState)(Home);
