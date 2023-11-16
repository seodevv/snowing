import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Box } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import {
  Order as IOrder,
  OrderProduct,
  useGetOrderProductQuery,
} from '../app/apiSlice';
import { MONTHS } from './Feed';
import { useNavigate } from 'react-router-dom';
import { Detail } from '../pages/my/MyOrder';

const OrderBox = styled(Box)`
  margin: 10px;
  width: calc(50% - 20px);
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
    transition: 0.1s all ease-in;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.9);
    }

    &:active {
      background: rgba(0, 0, 0, 0.75);
      transition: none;
    }

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
      letter-spacing: 1px;
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
  item: IOrder;
  setState: Dispatch<SetStateAction<Detail>>;
}

const Order = ({ item, setState }: OrderProps) => {
  const modified = new Date(item.modified);
  const [orderProduct, setOrderProduct] = useState<OrderProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    data: getOrderProduct,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetOrderProductQuery(item.id);

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      setOrderProduct(getOrderProduct.data);
      setTotalPrice(
        getOrderProduct.data.reduce(
          (acc, cur) => (acc += cur.price * cur.quantity),
          0
        )
      );
    }
  }, [isSuccess, isFetching]);

  return (
    <OrderBox>
      <div
        className="header"
        onClick={() =>
          setState({
            flag: true,
            orderId: item.id,
            modified: new Date(item.modified),
          })
        }
      >
        <div className="icon">
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
        <div className="status">
          <span>{item.status}</span>
          <span>
            Last updated {MONTHS[modified.getMonth()].substring(0, 3)}{' '}
            {modified.getDate()}
          </span>
        </div>
      </div>
      <div className="product-image">
        <div className="grid">
          {orderProduct.slice(0, 3).map((p, i) => {
            const image_array = p.image.split('/');
            return (
              <Box key={`${p.orderId}-${p.productId}-${p.sizeId}`}>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/files/${image_array[0]}`}
                  alt={image_array[0]}
                />
              </Box>
            );
          })}
        </div>
      </div>
      <div className="info">
        <p>{orderProduct.length} items</p>
        <span>주문번호 #{item.id}</span>
        <p className="price">\{totalPrice.toLocaleString()}</p>
      </div>
      <div className="buy">
        <button>Buy again</button>
      </div>
    </OrderBox>
  );
};

export default Order;
