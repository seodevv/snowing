import React from 'react';
import styled from 'styled-components';
import { Box } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const OrderBox = styled(Box)`
  margin: 15px;
  width: calc(50% - 30px);
  min-width: 250px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 5px #000;

  .header {
    padding: 15px 5px;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;

    .icon {
      padding: 0 10px;
    }

    .status {
      padding: 0 5px;
      flex-grow: 1;
      font-size: 0.9rem;
      font-weight: bold;

      span {
        display: block;
      }

      span:nth-of-type(2) {
        font-size: 0.8rem;
        font-weight: normal;
      }
    }
  }

  .product-image {
    margin: 15px 0;
    padding-top: 100%;
    position: relative;
    width: 100%;

    .grid {
      position: absolute;
      top: 0;
      left: 0;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(50%, auto));
      width: 100%;
      height: 100%;
      border-top: 3px solid #eee;
      border-left: 3px solid #eee;
      overflow: hidden;

      > div {
        width: 100%;
        height: 100%;
        border-right: 3px solid #eee;
        border-bottom: 3px solid #eee;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        scale: 1.5;
      }
    }
  }

  .info {
    margin: 10px 15px 0 15px;
    font-size: 0.9rem;
    line-height: 1.5rem;
    letter-spacing: 0.5px;

    p {
      font-weight: bold;
    }

    .price {
      margin: 15px 0 5px 0;
    }
  }

  .buy {
    padding: 15px;
    width: 100%;

    button {
      padding: 12px;
      width: 100%;
      border: 3px solid #eee;
      background: none;
      font-weight: bold;
      color: #65a8ff;
      letter-spacing: 0.5px;
      transition: 0.3s all ease-in;
      cursor: pointer;

      &:hover {
        background: #65a8ff;
        border-color: #65a8ff;
        color: #fff;
      }

      &:active {
        filter: blur(1px);
        border-color: #000;
        transition: none;
      }
    }
  }
`;

interface OrderProps {
  orderId: number;
}

const Order = ({ orderId }: OrderProps) => {
  return (
    <OrderBox>
      <div className="header">
        <div className="icon">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <div className="status">
          <span>주문 완료</span>
          <span>Last updated Oct 6</span>
        </div>
      </div>
      <div className="product-image">
        <div className="grid">
          <div>
            <img src="https://localhost:8080/files/1_JACKET_1.PNG" />
          </div>
          <div>
            <img src="https://localhost:8080/files/2_JACKET_1.PNG" />
          </div>
          <div>
            <img src="https://localhost:8080/files/3_JACKET_1.PNG" />
          </div>
        </div>
      </div>
      <div className="info">
        <p>3 items</p>
        <span>주문번호 #{orderId}</span>
        <p className="price">\139,000</p>
      </div>
      <div className="buy">
        <button>Buy again</button>
      </div>
    </OrderBox>
  );
};

export default Order;
