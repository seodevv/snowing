import React, { useLayoutEffect, useState } from 'react';
import { Box } from '../../components/Styled';
import Category from '../../components/Category';
import Price from '../../components/Price';
import ProductView from '../main/ProductView';
import {
  Brands,
  ProductList,
  Size,
  useGetBrandsQuery,
  useGetProductsListQuery,
  useGetSizeGroupQuery,
} from '../../app/apiSlice';
import styled from 'styled-components';
import { More } from '../shop/Shop';
import Spinner from '../../components/Spinner';
import BrandEmpty from './BrandEmpty';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilterBrand,
  selectFilterPage,
  selectFilterPrice,
  selectFilterSize,
  setFilter,
} from '../../app/slice';

const BrandsList = styled(Box)`
  padding: 20px;
  position: fixed;
  top: 100px;
  z-index: 1;
  min-width: 240px;
  height: calc(100dvh - 100px);
  background: #fff;
  border-right: 1px solid #eee;
  overflow: scroll;

  .title {
    padding: 0 0 20px 5px;
    font-size: 1.5rem;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #777;
  }

  .brands {
    padding: 0 0 10px 5px;
    list-style: none;

    li {
      margin: 5px;
      font-size: 0.9rem;
      font-style: italic;
      transition: 0.1s all ease-in;
      cursor: pointer;
    }

    .select {
      padding-left: 10px;
      font-size: 1rem;
      font-weight: bold;
      font-style: unset;
      text-decoration: underline;
      border-left: 3px solid #000;
    }
  }

  .sizes {
    padding: 0 0 10px 5px;
    list-style: none;
    vertical-align: top;

    li {
      margin: 5px;
      font-size: 0.9rem;
      font-weight: 100;
    }

    label {
      margin-left: 5px;
      position: relative;
      top: -1.5px;
      cursor: pointer;
    }
  }
`;

const ProductsList = styled(Box)`
  margin-left: 240px;
  display: flex;
  flex-flow: row wrap;
  flex-grow: 1;
  animation: fade-in 0.3s ease-in;
`;

export const EmptyBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: ${(props) => (props.wid ? props.wid : '100%')};
  height: ${(props) => (props.hei ? props.hei : 'calc(70dvh - 100px')};
`;

const BrandsPortal = () => {
  const dispatch = useDispatch();
  const brand = useSelector(selectFilterBrand);
  const page = useSelector(selectFilterPage);
  const price = useSelector(selectFilterPrice);
  const size = useSelector(selectFilterSize);

  const [pageAction, setPageAction] = useState(false);
  const [end, setEnd] = useState(false);
  const [brands, setBrands] = useState<Brands[]>([
    {
      id: -1,
      brand: 'loading',
      logo: '',
    },
  ]);
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
  const [sizes, setSizes] = useState<Size[]>([
    {
      id: -1,
      size: 'loading',
    },
  ]);

  const {
    data: getBrands,
    isSuccess: brdIsSuc,
    isFetching: brdIsFet,
    isError: brdIsErr,
  } = useGetBrandsQuery();

  const {
    data: getSizes,
    isSuccess: sizeIsSuc,
    isFetching: sizeIsFet,
    isError: sizeIsErr,
  } = useGetSizeGroupQuery();

  const {
    data: getProductList,
    isLoading: plistIsLoad,
    isSuccess: plistIsSuc,
    isFetching: plistIsFet,
    isError: plistIsErr,
  } = useGetProductsListQuery({
    type: 'new',
    limit: 16 * page,
    brand,
    price: price.flag ? price.maxPrice : undefined,
    size,
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [brand, price, size]);

  useLayoutEffect(() => {
    if (brdIsSuc && !brdIsFet) {
      setBrands([{ id: 0, brand: 'all', logo: '' }, ...getBrands.data]);
    } else if (brdIsErr) {
      setBrands(
        Array(1)
          .fill(undefined)
          .map((v) => ({
            id: -1,
            brand: 'error',
            logo: '',
          }))
      );
    }
  }, [brdIsSuc, brdIsFet, brdIsErr]);

  useLayoutEffect(() => {
    if (sizeIsSuc && !sizeIsFet) {
      setSizes(getSizes.data);
    } else if (sizeIsErr) {
      setSizes(
        Array(1)
          .fill(undefined)
          .map((v, i) => ({
            id: i,
            size: 'error',
          }))
      );
    }
  }, [sizeIsSuc, sizeIsFet, sizeIsErr]);

  useLayoutEffect(() => {
    if (plistIsFet && !pageAction) {
      setProducts(
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
    } else if (plistIsSuc && !plistIsFet) {
      setProducts(getProductList.data);
      setPageAction(false);
      if (page * 16 > getProductList.data.length) setEnd(true);
      else setEnd(false);
    } else if (plistIsErr) {
      setProducts(
        Array(16)
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
  }, [plistIsSuc, plistIsFet, plistIsErr, brand, price, size]);

  return (
    <>
      <Box>
        <BrandsList className="scroll-none">
          <div className="title">
            <span>DESIGNERS</span>
          </div>
          <Category
            text="Category"
            active
            list={
              <ul className="brands">
                {brands.map((v) => {
                  const isSelect = v.brand === brand ? 'select' : '';
                  return (
                    <li
                      key={v.id}
                      className={isSelect}
                      onClick={() => {
                        dispatch(setFilter({ brand: v.brand }));
                      }}
                    >
                      {v.brand.replace(/^[a-z]/, (v) => v.toUpperCase())}
                    </li>
                  );
                })}
              </ul>
            }
          />
          <Category text="price" active={price.flag} list={<Price />} />
          <Category
            text="size"
            active={size.length !== 0}
            list={
              <ul className="sizes">
                {sizes.map((v) => {
                  const isChecked = !!size.find((s) => s === v.id);
                  return (
                    <li key={v.size}>
                      <input
                        type="checkbox"
                        id={v.size}
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatch(
                              setFilter({ size: [...new Set([...size, v.id])] })
                            );
                          } else {
                            const index = size.findIndex((s) => s === v.id);
                            const copy = [...size];
                            if (index !== -1) copy.splice(index, 1);
                            dispatch(setFilter({ size: copy }));
                          }
                        }}
                      />
                      <label htmlFor={v.size}>{v.size}</label>
                    </li>
                  );
                })}
              </ul>
            }
          />
        </BrandsList>
        <ProductsList key={brand}>
          {products.map((item) => (
            <ProductView
              key={item.id}
              wid="25%"
              item={item}
              ids={products.map((v) => v.id)}
              current={-1}
              isLoading={plistIsLoad}
              isFetching={plistIsFet}
              isError={plistIsErr}
            />
          ))}
          {products.length === 0 && <BrandEmpty brand={brand} />}
        </ProductsList>
        {products.length !== 0 && (
          <More ma="50px 0 50px 240px">
            {plistIsFet && (
              <div className="fetching">
                <Spinner />
              </div>
            )}
            {!end && (
              <button
                className="more"
                onClick={() => {
                  dispatch(setFilter({ page: page + 1 }));
                  setPageAction(true);
                }}
                disabled={plistIsFet}
              >
                Load More
              </button>
            )}
          </More>
        )}
      </Box>
    </>
  );
};

export default BrandsPortal;
