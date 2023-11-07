import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Container, FlexBox } from '../../components/Styled';
import Sort from '../../components/Sort';
import { ProductList, useGetProductsListQuery } from '../../app/apiSlice';
import ProductView from '../main/ProductView';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterPage, selectFilterSort, setFilter } from '../../app/slice';
import {
  errorProduct,
  initialProduct,
  initialProductArray,
} from '../product/Product';

const ShopBox = styled(Container)`
  margin-top: 125px;
  animation: fade-in 0.5s ease-in;
`;

const ShopContent = styled(FlexBox)`
  flex-flow: row wrap;
`;

export const More = styled(Box)`
  margin: ${(props) => (props.ma ? props.ma : '50px 0')};

  .more {
    margin: auto;
    padding: 10px;
    display: block;
    width: 300px;
    background: #000;
    color: #fff;
    letter-spacing: -0.5px;
    transition: 0.1s all ease-in;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
      transition: none;
    }

    &:disabled {
      opacity: 0.3;
    }
  }

  .fetching {
    margin: 25px 0;
    font-size: 2.5rem;
    text-align: center;
    animation: fade-in 0.5s ease-in;
  }
`;

interface ShopProps {
  category?: string;
}

const Shop = ({ category }: ShopProps) => {
  const dispatch = useDispatch();
  const page = useSelector(selectFilterPage);
  const sort = useSelector(selectFilterSort);

  const [order, setOrder] = useState('new');
  const [pageAction, setPageAction] = useState(false);
  const [end, setEnd] = useState(false);
  const [products, setProducts] = useState<ProductList[]>(
    initialProductArray(16, initialProduct)
  );

  const {
    data: getList,
    isLoading,
    isSuccess,
    isFetching,
    isError,
  } = useGetProductsListQuery({ order, limit: 16 * page, category });

  const productLoadMore = () => {
    dispatch(setFilter({ page: page + 1 }));
    setPageAction(true);
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    switch (sort) {
      case 0:
        setOrder('new');
        break;
      case 1:
        setOrder('popular');
        break;
      case 2:
        setOrder('priceAsc');
        break;
      case 3:
        setOrder('priceDesc');
        break;
      case 4:
        setOrder('nameAsc');
        break;
      case 5:
        setOrder('nameDesc');
        break;
    }
  }, [sort]);

  useLayoutEffect(() => {
    if (isFetching && !pageAction) {
      setProducts(initialProductArray(16, initialProduct));
    } else if (isSuccess && !isFetching) {
      setProducts(getList.data); // realState
      setPageAction(false);
      if (page * 16 > getList.data.length) setEnd(true);
    } else if (isError) {
      setProducts(initialProductArray(16, errorProduct));
    }
  }, [isSuccess, isFetching, isError, order, page]);

  return (
    <>
      <ShopBox>
        <Sort />
        <ShopContent>
          {products.map((item) => (
            <ProductView
              item={item}
              key={item.id}
              wid="25%"
              ids={products.map((v) => v.id)}
              current={-1}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
            />
          ))}
        </ShopContent>
        <More>
          {isFetching && (
            <div className="fetching">
              <Spinner />
            </div>
          )}
          {!end && (
            <button
              className="more"
              onClick={() => productLoadMore()}
              disabled={isFetching}
            >
              Load More
            </button>
          )}
        </More>
      </ShopBox>
    </>
  );
};

export default Shop;
