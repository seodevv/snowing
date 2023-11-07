import React, { useState } from 'react';
import { Box } from '../../components/Styled';
import styled from 'styled-components';
import Order from '../../components/Order';
import MyEmpty from './MyEmpty';

const MyOrderBox = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  animation: fade-in 0.3s ease-in;

  .link {
    margin: 25px 0;
    font-size: 1.3rem;
    color: #ff5d12;
    text-decoration: underline;
    transition: 0.1s opacity ease-in;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
    }
  }
`;

const MyOrder = () => {
  const [orders, setOrders] = useState([
    100000000, 100000001, 100000002, 100000003, 100000004,
  ]);

  return (
    <>
      <MyOrderBox>
        {orders.map((v) => (
          <Order key={v} orderId={v} />
        ))}
        {orders.length === 0 && (
          <MyEmpty
            text="orders"
            element={<span className="link">Start Browsing</span>}
            hei="500px"
          />
        )}
      </MyOrderBox>
    </>
  );
};

export default MyOrder;
