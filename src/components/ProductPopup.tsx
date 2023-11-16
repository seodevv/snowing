import React, { useLayoutEffect, useState } from 'react';
import { FixedBox } from './Feed';
import styled from 'styled-components';
import { Box, Button, FlexBox } from './Styled';
import {
  ProductList,
  ProductSize,
  useGetProductsListByIdQuery,
} from '../app/apiSlice';
import { errorProduct, initialProduct } from '../pages/product/Product';
import ProductInfo from '../pages/product/ProductInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { closeProductPopup } from '../app/slice';
import ProductImageSlider from '../pages/product/ProductImageSlider';

const Inner = styled(FlexBox)`
  padding: 50px 25px;
  position: relative;
  align-items: flex-start;
  width: 90%;
  max-width: 980px;
  background: #fff;
`;

interface ProductPopupProps {
  id: number;
}

const ProductPopup = ({ id }: ProductPopupProps) => {
  const dispatch = useDispatch();

  const [product, setProduct] = useState<ProductList>(initialProduct);
  const [size, setSize] = useState<Pick<ProductSize, 'sizeId' | 'size'>>({
    sizeId: -1,
    size: 'select',
  });
  const [quantity, setQuantity] = useState<ProductSize['quantity']>(1);

  const {
    data: getProduct,
    isLoading,
    isSuccess,
    isError,
  } = useGetProductsListByIdQuery(id.toString());

  useLayoutEffect(() => {
    const closeListener = (e: KeyboardEvent) => {
      if (e.keyCode === 27) dispatch(closeProductPopup());
    };
    window.addEventListener('keydown', closeListener);
    return () => window.removeEventListener('keydown', closeListener);
  }, []);

  useLayoutEffect(() => {
    if (isSuccess) {
      setProduct(getProduct.data);
    } else if (isError) {
      setProduct(errorProduct);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <FixedBox
        bg="rgba(0,0,0,0.7)"
        backdropFilter="blur(5px)"
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            dispatch(closeProductPopup());
          }
        }}
      >
        <Inner>
          <Box mr="25px" flex={2}>
            <ProductImageSlider isLoading={isLoading} images={product.image} />
          </Box>
          <Box flex={1}>
            <ProductInfo
              product={product}
              size={size}
              setSize={setSize}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </Box>
          <Button
            posit="absolute"
            top="10px"
            right="10px"
            onClick={() => dispatch(closeProductPopup())}
          >
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </Button>
        </Inner>
      </FixedBox>
    </>
  );
};

export default ProductPopup;
