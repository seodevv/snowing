import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, FlexBox } from '../../components/Styled';
import ProductBanner from '../main/ProductBanner';
import { ProductList, useGetProductsListQuery } from '../../app/apiSlice';
import ProductView from '../main/ProductView';
import { More } from '../shop/Shop';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterPage, setFilter } from '../../app/slice';
import {
  errorProduct,
  initialProduct,
  initialProductArray,
} from '../product/Product';

const NewBox = styled(Container)`
  margin-top: 100px;
  animation: fade-in 0.5s ease-in;
`;

const NewContent = styled(FlexBox)`
  margin: 25px 0;
  flex-flow: row wrap;
`;

const New = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectFilterPage);

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
  } = useGetProductsListQuery({ order: 'new', limit: 16 * page });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      setProducts(getList.data);
      if (page * 16 > getList.data.length) setEnd(true);
    } else if (isError) {
      setProducts(initialProductArray(16, errorProduct));
    }
  }, [isSuccess, isFetching, isError, page]);

  return (
    <>
      <NewBox>
        <ProductBanner
          type="banner"
          name="new"
          title="new arrivals"
          pa="0"
          height="450px"
        />
        <NewContent>
          {products.map((item) => {
            const message = item.sell && item.sell > 190 ? 'Best Seller' : '';
            return (
              <ProductView
                item={item}
                key={item.id}
                wid="25%"
                ids={products.map((v) => v.id)}
                message={message}
                current={-1}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
              />
            );
          })}
        </NewContent>
        <More>
          {isFetching && (
            <div className="fetching">
              <Spinner />
            </div>
          )}
          {!end && (
            <button
              className="more"
              onClick={() => {
                dispatch(setFilter({ page: page + 1 }));
              }}
              disabled={isFetching}
            >
              Load More
            </button>
          )}
        </More>
      </NewBox>
    </>
  );
};

export default New;
