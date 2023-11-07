import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, FlexBox } from '../../components/Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartB } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartA } from '@fortawesome/free-regular-svg-icons';
import Size from '../../components/Size';
import Quantity from '../../components/Quantity';
import Navigator from '../../components/Navigator';
import {
  Cart,
  ProductList,
  ProductSize,
  Wish,
  useGetProductsListByIdQuery,
  useGetWishQuery,
  usePostCartMutation,
  usePostWishMutation,
} from '../../app/apiSlice';
import ProductDescription from './ProductDescription';
import Slide from '../../components/Slide';
import ProductImage from './ProductImage';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, showCart, showSignup } from '../../app/slice';
import { useParams } from 'react-router-dom';
import { createCartObject } from '../cart/Cart';

const ProductBox = styled.section`
  margin-top: 150px;
  margin-bottom: 50px;
  padding: 25px;
  background: #fff;
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
`;

const ProductContent = styled(FlexBox)`
  align-items: flex-start;

  .info {
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

export const initialProduct: ProductList = {
  id: -1,
  name: 'Loading Product',
  brandName: 'Loading Brand',
  brandLogo: '',
  desc: 'Loading Description',
  price: 999999,
  image: '',
};

export const errorProduct: ProductList = {
  id: -1,
  name: 'Network Error. Please try again',
  brandName: 'Error Brand',
  brandLogo: '',
  desc: 'Error Description',
  price: 999999,
  image: '',
};

export const initialProductArray = (
  num: number,
  init: ProductList
): ProductList[] => {
  return Array(num)
    .fill(undefined)
    .map((_, i) => ({
      ...init,
      id: i,
    }));
};

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [postWish] = usePostWishMutation();
  const [postCart] = usePostCartMutation();

  const [product, setProduct] = useState<ProductList>(initialProduct);
  const [wish, setWish] = useState<Wish>({ result: false });
  const [size, setSize] = useState<Pick<ProductSize, 'sizeId' | 'size'>>({
    sizeId: -1,
    size: 'select',
  });
  const [quantity, setQuantity] = useState<ProductSize['quantity']>(1);
  const [current, setCurrent] = useState(0);
  const [readMore, setReadMore] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const {
    data: getProduct,
    isLoading: prdLoad,
    isSuccess: prdSuc,
    isFetching: prdFet,
    isError: prdErr,
  } = useGetProductsListByIdQuery(id, { skip: !id });

  const {
    data: getWish,
    isLoading: wishLoad,
    isSuccess: wishSuc,
    isFetching: wishFet,
    isError: wishErr,
  } = useGetWishQuery(
    { userId: user ? user.id : -1, listId: id ? id : '-1' },
    { skip: !user?.id || !id ? true : false }
  );

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
      dispatch(showCart());
    } catch (error) {}
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    setCurrent(0);
    setReadMore(false);
    setSize({ sizeId: -1, size: 'select' });
    setSizeError(false);
    setQuantity(1);
  }, [id]);

  useLayoutEffect(() => {
    if (prdFet) {
      setProduct(initialProduct);
    } else if (prdSuc && !prdFet) {
      setProduct(getProduct.data);
    } else if (prdErr) {
      setProduct(errorProduct);
    }
  }, [prdSuc, prdFet, prdErr, id]);

  useLayoutEffect(() => {
    if (wishFet) {
      setWish({
        result: false,
      });
    } else if (wishSuc && !wishFet) {
      setWish(getWish.data);
    } else if (wishErr) {
      setWish({
        result: false,
      });
    }
  }, [wishSuc, wishFet, wishErr, id]);

  return (
    <>
      <ProductBox key={id}>
        <Box ma="auto" wid="100%" maxWid="980px">
          <Navigator id={id} />
          <ProductContent>
            <Slide
              isLoading={prdLoad || prdFet}
              images={product.image}
              status={current}
              setStatus={setCurrent}
            />
            <ProductImage
              isLoading={prdLoad || prdFet}
              images={product.image}
              status={current}
            />
            <div className="info">
              <div className="brand">
                {product.brandLogo ? (
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/files/${product.brandLogo}`}
                    alt={product.brandLogo}
                  />
                ) : (
                  <span>
                    {product.brandName?.replace(/^[a-z]/, (v) =>
                      v.toUpperCase()
                    )}
                  </span>
                )}
              </div>
              <h1 className="name">{product.name}</h1>
              <p className="price">\{product.price.toLocaleString()}</p>
              <p className="installment">
                or 4 interest-free payments of \
                {(product.price / 4).toLocaleString()} with Payment
              </p>
              <ProductDescription
                id={id}
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
              <Size
                id={id}
                status={size}
                setStatus={setSize}
                error={sizeError}
                setError={setSizeError}
              />
              <Quantity
                text="quantity"
                status={quantity}
                setStatus={setQuantity}
              />
              <div className="actions">
                <button className="cart" onClick={() => addCartHandler()}>
                  Add to Cart
                </button>
                <div
                  className="wish"
                  onClick={async () => {
                    if (!user) {
                      dispatch(showSignup());
                    } else if (id) {
                      try {
                        await postWish({ userId: user.id, listId: id });
                      } catch (error) {
                        console.error(error);
                      }
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={wish.result ? heartB : heartA}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </ProductContent>
        </Box>
      </ProductBox>
    </>
  );
};

export default Product;
