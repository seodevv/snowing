import React, { useLayoutEffect, useState } from 'react';
import { Box, FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import { ProductList, useGetProductsListQuery } from '../../app/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import ProductView from './ProductView';

const Items = styled(FlexBox)`
  position: relative;
  width: 100%;

  .left,
  .right {
    padding: 15px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    &:hover {
      opacity: 0.25;
    }

    &:active {
      opacity: 0.5;
    }
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
`;

interface ProductSliderProps {
  type: string;
  text: string;
  pa?: string;
  bg?: string;
}

const ProductSlider = ({
  type,
  text,
  pa = '25px',
  bg = '#fff',
}: ProductSliderProps): JSX.Element => {
  const {
    data: getList,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetProductsListQuery({
    type,
  });

  const [products, setProducts] = useState<ProductList[]>(
    Array(4)
      .fill(undefined)
      .map((_, i) => ({
        id: i,
        name: 'Loading Product',
        desc: '',
        image: 'LOADING.png',
        price: 999999,
        size: 'free',
      }))
  );
  const [current, setCurrent] = useState<number>(-1);

  const currentChangeAction = (type: 'left' | 'right') => {
    if (!products) return;
    switch (type) {
      case 'left':
        if (current === 0) {
          setCurrent(products.length - 4);
        } else {
          setCurrent((prev) => prev - 1);
        }
        break;
      case 'right':
        if (current === products.length - 4) {
          setCurrent(0);
        } else {
          setCurrent((prev) => prev + 1);
        }
        break;
    }
  };

  useLayoutEffect(() => {
    if (isSuccess) {
      setProducts(getList.data); // realState
      setCurrent(
        getList.data.length <= 4 ? -1 : parseInt(getList.data.length / 2 + '')
      );
    } else if (isError) {
      setProducts(
        // errorState
        Array(4)
          .fill(undefined)
          .map((_, i) => ({
            id: i,
            name: 'Network Error. Please try again',
            desc: '',
            image: 'ERROR.png',
            price: 999999,
            size: 'free',
          }))
      );
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Box pa={pa} bg={bg}>
        <Header text={text} />
        <FlexBox wid="100%" flexDir="row" flexWrap="nowrap" overflow="hidden">
          <Items>
            {products.map((item) => (
              <ProductView
                key={item.id}
                minWid="25%"
                item={item}
                ids={products.map((v) => v.id)}
                current={current}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
              />
            ))}
            {current !== -1 && (
              <>
                <FontAwesomeIcon
                  className="left"
                  icon={faChevronLeft}
                  size="xl"
                  onClick={() => currentChangeAction('left')}
                />
                <FontAwesomeIcon
                  className="right"
                  icon={faChevronRight}
                  size="xl"
                  onClick={() => currentChangeAction('right')}
                />
              </>
            )}
          </Items>
        </FlexBox>
      </Box>
    </>
  );
};

export default ProductSlider;
