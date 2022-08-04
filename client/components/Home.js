import React from "react";
import { connect } from "react-redux";
import AllProducts from "./products/AllProducts";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <>
      <div>
        <h2>Welcome, {username}</h2>
      </div>
      <AllProducts />
    </>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
