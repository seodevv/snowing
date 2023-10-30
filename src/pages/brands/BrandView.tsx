import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import { ProductList, useGetProductsListQuery } from '../../app/apiSlice';
import ProductBanner from '../main/ProductBanner';
import ProductView from '../main/ProductView';
import { More } from '../shop/Shop';
import Spinner from '../../components/Spinner';
import { EmptyBox } from './BrandsPortal';
import BrandEmpty from './BrandEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterPage, setFilter } from '../../app/slice';

const BrandViewBox = styled(Box)`
  .products {
    margin-top: 50px;
    display: flex;
    flex-flow: row wrap;
  }
`;

interface BrandViewProps {
  brand: string;
}

const BrandView = ({ brand }: BrandViewProps) => {
  const dispatch = useDispatch();
  const page = useSelector(selectFilterPage);
  const [end, setEnd] = useState(false);
  const [products, setProducts] = useState<ProductList[]>(
    Array(16)
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

  const config = {
    skip: !brand,
  };
  const {
    data: getProductList,
    isLoading,
    isSuccess,
    isFetching,
    isError,
  } = useGetProductsListQuery(
    {
      type: 'new',
      limit: 16 * page,
      brand,
    },
    config
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (isFetching) {
    } else if (isSuccess && !isFetching) {
      setProducts(getProductList.data);
      if (16 * page > getProductList.data.length) setEnd(true);
      else setEnd(false);
    } else if (isError) {
      setProducts(
        Array(16)
          .fill(undefined)
          .map((_, i) => ({
            id: i,
            name: 'error',
            desc: '',
            image: 'ERROR.png',
            price: 999999,
            size: 'free',
          }))
      );
    }
  }, [isSuccess, isFetching, isError]);

  return (
    <>
      <BrandViewBox>
        <ProductBanner type="banner" name={brand} height="450px" />
        <div className="products">
          {products.map((v) => (
            <ProductView
              key={v.id}
              item={v}
              ids={products.map((v) => v.id)}
              current={-1}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              wid="25%"
            />
          ))}
          {products.length === 0 && (
            <BrandEmpty brand={brand} wid="100%" hei="450px" />
          )}
        </div>
        {products.length !== 0 && (
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
        )}
      </BrandViewBox>
    </>
  );
};

export default BrandView;
