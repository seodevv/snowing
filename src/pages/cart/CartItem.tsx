import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { FlexBox } from '../../components/Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Cart } from '../product/Product';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/slice';

const CartBox = styled(FlexBox)`
  margin-bottom: 15px;
  padding: 15px 5px 15px 15px;
  position: relative;
  align-items: center;
  border-bottom: 1px solid #ccc;

  > div:nth-child(1) {
    margin-right: 10px;
  }

  .image {
    width: 100px;
    height: 100px;
  }

  .name {
    font-size: 0.9rem;
  }

  .price {
    margin-top: 5px;
    font-size: 0.9rem;
    font-weight: bold;
  }

  .count-box {
    display: inline-block;
    margin-top: 5px;
    height: 25px;
    border: 1px solid #000;

    button {
      height: 100%;
      background: transparent;
      border: none;
      font-size: 0.9rem;
      vertical-align: middle;
    }

    .count {
      vertical-align: top;
    }

    .increase,
    .decrease {
      font-size: 0.7rem;
    }
  }

  .delete {
    padding: 5px;
    position: absolute;
    bottom: 10px;
    right: 10px;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
    }
  }
`;

interface CartItemProps {
  data: Cart;
  setStatus: Dispatch<SetStateAction<Cart[]>>;
}

const Cartitem = ({ data, setStatus }: CartItemProps) => {
  const user = useSelector(selectUser);
  const [count, setCount] = useState(data.count);

  const changeCountHandler = (type: 'inc' | 'dec') => {
    if (!user) {
      const local = localStorage.getItem('cart');
      if (!local) return;

      let items: Cart[] = JSON.parse(local);
      const index = items.findIndex(
        (v) => v.id === data.id && v.size === data.size
      );
      switch (type) {
        case 'inc':
          items[index].count++;
          setCount((prev) => prev + 1);
          break;
        case 'dec':
          if (items[index].count !== 1) {
            items[index].count--;
            setCount((prev) => prev - 1);
          }
          break;
      }
      localStorage.setItem('cart', JSON.stringify(items));
      setStatus(items);
    }
  };

  return (
    <>
      <CartBox>
        <div>
          <img
            className="image"
            src={`${process.env.REACT_APP_SERVER_URL}/files/${
              data.image.split('/')[0]
            }`}
            alt={data.image.split('/')[0]}
          />
        </div>
        <div>
          <span className="name">{data.name}</span>
          <p className="price">\{data.price.toLocaleString()}</p>
          <div className="count-box">
            <button
              className="decrese"
              onClick={() => changeCountHandler('dec')}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <button className="count">{count}</button>
            <button className="increase">
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => changeCountHandler('inc')}
              />
            </button>
          </div>
        </div>
        <div className="delete">
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </CartBox>
    </>
  );
};

export default Cartitem;
