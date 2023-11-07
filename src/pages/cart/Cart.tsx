import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import { FixedBox } from '../../components/Feed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { closeCart, selectUser, showSignup } from '../../app/slice';
import Cartitem from './CartItem';
import {
  Cart as ICart,
  ProductList,
  ProductSize,
  useGetCartQuery,
} from '../../app/apiSlice';

const CartBox = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100dvh;
  background: #fff;
  animation-name: slide-in;
  animation-duration: 0.3s;
  animation-timing-function: ease-in;

  @keyframes slide-in {
    0% {
      right: -350px;
    }

    100% {
      right: 0;
    }
  }

  .button {
    padding: 15px;
    width: 100%;
    height: 50px;
    background: #000;
    font-size: 1rem;
    color: #fff;
    text-align: center;
    letter-spacing: 0.5px;
    transition: 0.2s all ease-in;
  }
`;

const CartHeader = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  background: #000;
  color: #fff;
  text-align: center;
  user-select: none;

  .title {
    font-size: 1.3rem;
    letter-spacing: 0.5px;
  }

  .close {
    padding: 10px;
    position: absolute;
    top: 50%;
    left: 25px;
    font-size: 1.2rem;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #fff);
    }

    &:active {
      filter: blur(1px);
    }
  }
`;

const CartContent = styled(Box)`
  padding: 35px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: calc(100dvh - 200px);
  overflow: hidden;

  .empty {
    font-size: 1.2rem;
    text-align: center;
  }

  .items {
    flex-grow: 1;
    overflow-y: scroll;
  }

  .total {
    font-size: 1.5rem;
    letter-spacing: 1px;

    &:first-of-type {
      display: inline-block;
      border-bottom: 3px solid #000;
    }
  }
`;

const CartFooter = styled(Box)`
  padding: 25px;
  height: 100px;
  border-top: 1px solid #000;
`;

export const createCartObject = (
  product: ProductList,
  size: Pick<ProductSize, 'sizeId' | 'size'>,
  quantity: ProductSize['quantity']
): ICart => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    sizeId: size.sizeId,
    size: size.size,
    quantity: quantity,
  };
};

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [carts, setCarts] = useState<ICart[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const { data: getCartItems, isSuccess } = useGetCartQuery(
    user?.id as number,
    {
      skip: !user,
    }
  );

  useLayoutEffect(() => {
    if (!user) {
      const local = localStorage.getItem('cart');
      let items: ICart[] = local ? JSON.parse(local) : [];
      setCarts(items);
      return;
    }

    if (isSuccess) {
      setCarts(
        getCartItems.data.map((v) => ({
          id: v.id,
          name: v.name,
          image: v.image,
          price: v.price,
          sizeId: v.sizeId,
          size: v.size,
          quantity: v.quantity,
        }))
      );
    }
  }, [user, isSuccess]);

  useLayoutEffect(() => {
    if (carts.length !== 0) {
      let sum = 0;
      carts.forEach((cart) => (sum += cart.price * cart.quantity));
      setSubtotal(sum);
    }
  }, [carts]);

  return (
    <>
      <FixedBox
        bg="rgba(0,0,0,0.3)"
        onClick={(e) => {
          if (e.target === e.currentTarget) dispatch(closeCart());
        }}
      >
        <CartBox>
          <CartHeader>
            <div>
              <span className="title">Cart</span>
            </div>
            <FontAwesomeIcon
              className="close"
              icon={faChevronRight}
              onClick={() => dispatch(closeCart())}
            />
          </CartHeader>
          <CartContent>
            {carts.length === 0 ? (
              <p className="empty">Cart is empty</p>
            ) : (
              <>
                <Box wid="100%">
                  <button className="button btn-effect" onClick={() => {}}>
                    View Cart
                  </button>
                </Box>
                <Box mt="15px" className="items scroll-none">
                  {carts.map((cart) => (
                    <Cartitem
                      key={cart.id + cart.sizeId}
                      data={cart}
                      setStatus={setCarts}
                    />
                  ))}
                </Box>
                <Box hei="70px">
                  <h1 className="total">Subtotal</h1>
                  <h1 className="total">\{subtotal.toLocaleString()}</h1>
                </Box>
              </>
            )}
          </CartContent>
          <CartFooter>
            <Box wid="100%">
              <button
                className="button btn-effect"
                onClick={() => {
                  if (!user) {
                    dispatch(showSignup());
                  }
                }}
              >
                Buy Now
              </button>
            </Box>
          </CartFooter>
        </CartBox>
      </FixedBox>
    </>
  );
};

export default Cart;
