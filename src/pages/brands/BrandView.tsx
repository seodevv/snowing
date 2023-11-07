import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import {
  Brands,
  ProductList,
  useGetBrandsQuery,
  useGetProductsListQuery,
} from '../../app/apiSlice';
import ProductBanner from '../main/ProductBanner';
import ProductView from '../main/ProductView';
import { More } from '../shop/Shop';
import Spinner from '../../components/Spinner';
import BrandEmpty from './BrandEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterPage, setFilter } from '../../app/slice';
import {
  errorProduct,
  initialProduct,
  initialProductArray,
} from '../product/Product';

const BrandViewBox = styled(Box)`
  .desc {
    margin: 50px auto 0 auto;
    width: 90%;
    max-width: 568px;
    color: #777;
    text-align: center;
    line-height: 1.5rem;
    letter-spacing: 0.5px;

    .image-box {
      margin: 0 auto 10px auto;
      max-width: 100px;
      max-height: 100px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

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
  const [brandInfo, setBrandInfo] = useState<Brands>({
    id: -1,
    brand,
    logo: '',
    image: '',
    category: '',
    desc: 'Loading Slogan',
  });
  const [products, setProducts] = useState<ProductList[]>(
    initialProductArray(16, initialProduct)
  );

  const config = {
    skip: !brand,
  };
  const {
    data: getBrand,
    isSuccess: brdSuc,
    isError: brdErr,
  } = useGetBrandsQuery({ brand: brand }, config);
  const {
    data: getProductList,
    isLoading: plistLoad,
    isSuccess: plistSuc,
    isFetching: plistFet,
    isError: plistErr,
  } = useGetProductsListQuery(
    {
      order: 'new',
      limit: 16 * page,
      brand,
    },
    config
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useLayoutEffect(() => {
    if (brdSuc) {
      setBrandInfo(getBrand.data[0]);
    } else if (brdErr) {
      setBrandInfo({
        id: -1,
        brand,
        logo: '',
        image: '',
        category: '',
        desc: 'error\r\nplease try again',
      });
    }
  }, [brdSuc, brdErr]);

  useLayoutEffect(() => {
    if (plistSuc && !plistFet) {
      setProducts(getProductList.data);
      if (16 * page > getProductList.data.length) setEnd(true);
      else setEnd(false);
    } else if (plistErr) {
      setProducts(initialProductArray(16, errorProduct));
    }
  }, [plistSuc, plistFet, plistErr]);

  return (
    <>
      <BrandViewBox>
        <ProductBanner type="banner" name={brand} height="450px" />
        <div className="desc">
          {brandInfo.logo && (
            <div className="image-box">
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/files/${brandInfo.logo}`}
                alt={brandInfo.logo}
              />
            </div>
          )}
          <p>{brandInfo.desc}</p>
        </div>
        <div className="products">
          {products.map((v) => (
            <ProductView
              key={v.id}
              item={v}
              ids={products.map((v) => v.id)}
              current={-1}
              isLoading={plistLoad}
              isFetching={plistFet}
              isError={plistErr}
              wid="25%"
            />
          ))}
          {products.length === 0 && (
            <BrandEmpty brand={brand} wid="100%" hei="450px" />
          )}
        </div>
        {products.length !== 0 && (
          <More>
            {plistFet && (
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
                disabled={plistFet}
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
