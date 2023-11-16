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
import ProductInfo from './ProductInfo';

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

  const [product, setProduct] = useState<ProductList>(initialProduct);
  const [size, setSize] = useState<Pick<ProductSize, 'sizeId' | 'size'>>({
    sizeId: -1,
    size: 'select',
  });
  const [quantity, setQuantity] = useState<ProductSize['quantity']>(1);
  const [current, setCurrent] = useState(0);

  const {
    data: getProduct,
    isLoading: prdLoad,
    isSuccess: prdSuc,
    isFetching: prdFet,
    isError: prdErr,
  } = useGetProductsListByIdQuery(id, { skip: !id });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    setCurrent(0);
    setSize({ sizeId: -1, size: 'select' });
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
            <ProductInfo
              product={product}
              installment
              description
              wish
              size={size}
              setSize={setSize}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </ProductContent>
        </Box>
      </ProductBox>
    </>
  );
};

export default Product;
