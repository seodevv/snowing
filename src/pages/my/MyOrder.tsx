import React, { useLayoutEffect, useState } from 'react';
import { Box, FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import Order from '../../components/Order';
import MyEmpty from './MyEmpty';
import { Order as IOrder, useGetOrderQuery } from '../../app/apiSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/slice';
import Spinner from '../../components/Spinner';
import OrderDetail from './OrderDetail';

const MyOrderBox = styled(Box)`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  max-height: 800px;
  animation: fade-in 0.3s ease-in;
  overflow-y: scroll;

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

  .visible {
    visibility: visible;
    opacity: 1;
    transform: translateX(0%);
  }
`;

export interface Detail {
  flag: boolean;
  orderId: number;
  modified: Date;
}

export const initialDetail = {
  flag: false,
  orderId: -1,
  modified: new Date(),
};

const MyOrder = () => {
  const user = useSelector(selectUser);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [detail, setDetail] = useState<Detail>(initialDetail);

  const {
    data: getOrder,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetOrderQuery(
    { type: 'list', userId: user ? user.id : -1 },
    { skip: !user }
  );

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      setOrders(getOrder.data);
    }
  }, [isSuccess, isFetching]);

  return (
    <>
      <MyOrderBox>
        {(isLoading || isFetching) && (
          <FlexBox
            posit="absolute"
            top="0"
            left="0"
            zIndex={1}
            wid="100%"
            hei="100%"
            bg="rgba(0,0,0,0.75)"
          >
            <Spinner color="#fff" size="2xl" />
          </FlexBox>
        )}
        {orders.map((v) => (
          <Order key={v.id} item={v} setState={setDetail} />
        ))}
        {orders.length === 0 && (
          <MyEmpty
            text="orders"
            element={<span className="link">Start Browsing</span>}
            hei="500px"
          />
        )}
        <OrderDetail state={detail} setState={setDetail} />
      </MyOrderBox>
    </>
  );
};

export default MyOrder;
