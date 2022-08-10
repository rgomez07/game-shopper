import React from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <div>
      <h1>Thank you for your purchase!</h1>
      <Link to="/home">
        <h2>Keep shopping.</h2>
      </Link>
      <br />
    </div>
  );
};

export default Checkout;
