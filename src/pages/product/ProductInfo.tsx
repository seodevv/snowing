import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import {
  Cart,
  ProductList,
  ProductSize,
  usePostCartMutation,
  usePostWishMutation,
} from '../../app/apiSlice';
import Size from '../../components/Size';
import Quantity from '../../components/Quantity';
import ProductDescription from './ProductDescription';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeProductPopup,
  selectProductPopup,
  selectUser,
  showCart,
} from '../../app/slice';
import { createCartObject } from '../cart/Cart';
import IsWish from '../../components/IsWish';

const ProductInfoBox = styled(Box)`
  flex: 3;

  .brand {
    margin-top: 15px;

    span {
      font-size: 1.2rem;
      font-style: italic;
      font-weight: bold;
      text-decoration: underline;
      letter-spacing: 1px;
      vertical-align: middle;
    }

    img {
      width: 100px;
      vertical-align: middle;
    }
  }

  .name {
    font-size: 1.8rem;
  }

  .price {
    margin-top: 25px;
    font-size: 1.3rem;
    font-weight: bold;
    color: #a1a1a1;
    letter-spacing: 3px;
  }

  .installment {
    margin-top: 15px;
    font-size: 1rem;
    font-weight: 100;
    color: #a1a1a1;
  }

  .active {
    height: auto;
  }

  .read-more {
    display: inline-block;
    font-weight: bolder;
    text-decoration: underline;
    letter-spacing: -1px;
    user-select: none;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
    }
  }

  .actions {
    margin-top: 25px;
    display: flex;
    height: 50px;

    .cart {
      padding: 15px;
      flex-grow: 1;
      display: block;
      background: #000;
      border: none;
      color: #fff;
      text-align: center;
      transition: 0.1s all ease-in;

      &:hover {
        opacity: 0.5;
      }

      &:active {
        opacity: 0.75;
        transition: none;
      }
    }

    .wish {
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 100%;
      background: #fff;
      border: 1px solid #777;

      &:hover {
        filter: brightness(0.9);
      }

      &:active {
        filter: blur(1px);
      }
    }
  }
`;

interface ProductInfoProps {
  product: ProductList;
  installment?: boolean;
  description?: boolean;
  wish?: boolean;
  size: Pick<ProductSize, 'sizeId' | 'size'>;
  setSize: Dispatch<SetStateAction<Pick<ProductSize, 'sizeId' | 'size'>>>;
  quantity: ProductSize['quantity'];
  setQuantity: Dispatch<SetStateAction<ProductSize['quantity']>>;
}

const ProductInfo = ({
  product,
  installment = false,
  description = false,
  wish = false,
  size,
  setSize,
  quantity,
  setQuantity,
}: ProductInfoProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const productPopup = useSelector(selectProductPopup);

  const [postCart] = usePostCartMutation();
  const [postWish] = usePostWishMutation();

  const [sizeError, setSizeError] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const addCartHandler = async () => {
    if (product.id === -1) return;
    if (size.size === 'select') return setSizeError(true);

    if (!user) {
      const local = localStorage.getItem('cart');
      let items: Cart[] = local ? JSON.parse(local) : [];
      const check = items.findIndex(
        (v) => v.id === product.id && v.sizeId === size.sizeId
      );
      if (check !== -1) {
        items[check].quantity++;
      } else {
        items.push(createCartObject(product, size, quantity));
      }
      localStorage.setItem('cart', JSON.stringify(items));
      dispatch(showCart());
      return;
    }

    try {
      let items: Cart[] = [createCartObject(product, size, quantity)];
      await postCart({ type: 'add', items, user: user.id });
      if (productPopup.flag) dispatch(closeProductPopup());
      dispatch(showCart());
    } catch (error) {}
  };

  return (
    <>
      <ProductInfoBox>
        <div className="brand">
          {product.brandLogo ? (
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/files/${product.brandLogo}`}
              alt={product.brandLogo}
            />
          ) : (
            <span>
              {product.brandName?.replace(/^[a-z]/, (v) => v.toUpperCase())}
            </span>
          )}
        </div>
        <h1 className="name">{product.name}</h1>
        <p className="price">\{product.price.toLocaleString()}</p>
        {installment && (
          <p className="installment">
            or 4 interest-free payments of \
            {(product.price / 4).toLocaleString()} with Payment
          </p>
        )}
        {description && (
          <>
            <ProductDescription
              id={product.id.toString()}
              desc={product.desc}
              status={readMore}
            />
            <div
              className="read-more"
              onClick={() => {
                setReadMore((prev) => !prev);
              }}
            >
              <span>{readMore ? 'Less' : 'Read more'}</span>
            </div>
          </>
        )}

        <Size
          id={product.id.toString()}
          status={size}
          setStatus={setSize}
          error={sizeError}
          setError={setSizeError}
        />
        <Quantity text="quantity" status={quantity} setStatus={setQuantity} />
        <div className="actions">
          <button className="cart" onClick={() => addCartHandler()}>
            Add to Cart
          </button>
          {wish && <IsWish id={product.id} />}
        </div>
      </ProductInfoBox>
    </>
  );
};

export default ProductInfo;
