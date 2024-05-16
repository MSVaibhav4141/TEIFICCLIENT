// src/components/PaymentSuccess.js

import React from 'react';
import './PaymentSuccess.css';
import CheckIcon from '@mui/icons-material/Check';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
const PaymentSuccess = ({amountPaid, buyerName }) => {

  const searchQuery = useSearchParams()[0]
  const orderId = searchQuery.get('reference')
  return (
    <div className="payment-success">
      <div className="success-animation"><CheckIcon /></div>
      <div className="success-info">
        <h2>Payment Successful!</h2>
        <p>Order ID: {orderId}</p>
        <p>Amount Paid: {amountPaid}</p>
        <p>Buyer Name: {buyerName}</p>
      </div>
      <Link to="/orders"><Button variant='outlined'>View Your Orders</Button></Link>
    </div>
  );
};

export default PaymentSuccess;
