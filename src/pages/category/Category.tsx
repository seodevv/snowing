import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import Shop, { More } from '../shop/Shop';
import ProductBanner from '../main/ProductBanner';
import {
  Category,
  ProductList,
  useGetProductCategoryQuery,
  useGetProductsListQuery,
} from '../../app/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilterPage,
  selectFilterSubjects,
  setFilter,
} from '../../app/slice';
import ProductView from '../main/ProductView';
import Spinner from '../../components/Spinner';
import Filter from '../../components/Filter';
import {
  errorProduct,
  initialProduct,
  initialProductArray,
} from '../product/Product';

const ClothingBox = styled(Container)`
  margin-top: 100px;
  animation: fade-in 0.3s ease-in;
`;

const Inner = styled(FlexBox)`
  .filter {
    padding: 20px;
    min-width: 240px;

    .title {
      padding: 0 0 20px 5px;
      font-size: 1.5rem;
      letter-spacing: 0.5px;
      border-bottom: 1px solid #777;
    }

    li {
      margin: 0 0 10px 5px;
      list-style: none;

      input {
        transform: scale(1.2);
        cursor: pointer;
      }

      label {
        margin-left: 7px;
        color: #777;
        letter-spacing: 0.5px;
        user-select: none;
        cursor: pointer;
      }
    }
  }

  .products {
    display: flex;
    flex-flow: row wrap;
    width: calc(100% - 240px);
  }

  .isSubject {
    width: 100%;
  }
`;

interface ClothingProps {
  category: string;
}

const Category = ({ category }: ClothingProps) => {
  const { param1, param2 } = useParams();

  const dispatch = useDispatch();
  const page = useSelector(selectFilterPage);
  const subjects = useSelector(selectFilterSubjects);

  const [type, setType] = useState(param1);
  const [subject, setSubject] = useState(param2);
  const [subjectList, setSubjectList] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductList[]>(
    initialProductArray(16, initialProduct)
  );
  const [pageAction, setPageAction] = useState(false);
  const [end, setEnd] = useState(false);

  const config = {
    skip: !type,
  };
  const {
    data: getCategory,
    isSuccess: cateSuc,
    isFetching: cateFet,
  } = useGetProductCategoryQuery(category, config);
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
      type,
      subjects: subject ? [subject] : subjects,
    },
    config
  );

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setType(param1);
    setSubject(param2);
  }, [param1, param2]);

  useLayoutEffect(() => {
    if (cateSuc && !cateFet) {
      setSubjectList(
        getCategory.data.filter((v) => v.type.toLowerCase() === type)
      );
    }
  }, [cateSuc, cateFet, type]);

  useLayoutEffect(() => {
    if (plistFet && !pageAction) {
      setProducts(initialProductArray(16, initialProduct));
    } else if (plistSuc && !plistFet) {
      setProducts(getProductList.data);
      setPageAction(false);
      if (page * 16 > getProductList.data.length) setEnd(true);
      else setEnd(false);
    } else if (plistErr) {
      setProducts(initialProductArray(16, errorProduct));
    }
  }, [plistSuc, plistFet, plistLoad, subjects, subject]);

  return (
    <>
      {!type && !subject && <Shop category={category} />}
      {type && (
        <ClothingBox key={subject ? subject : type}>
          <ProductBanner
            type={subject ? 'subject' : 'banner'}
            name={subject ? subject : type}
            height="450px"
          />
          <Inner>
            {!subject && (
              <div className="filter">
                <div className="title">
                  <span>Shop by</span>
                </div>
                <Filter
                  text={type.toUpperCase()}
                  active
                  list={subjectList.map((v) => (
                    <li key={v.id}>
                      <input
                        type="checkbox"
                        id={v.subject}
                        checked={!!subjects.find((s) => s === v.subject)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            const newSubjects = [
                              ...new Set([...subjects, v.subject]),
                            ];
                            dispatch(setFilter({ subjects: newSubjects }));
                          } else {
                            const index = subjects.findIndex(
                              (s) => s === v.subject
                            );
                            const newSubjects = [...subjects];
                            if (index !== -1) newSubjects.splice(index, 1);
                            dispatch(setFilter({ subjects: newSubjects }));
                          }
                        }}
                      />
                      <label htmlFor={v.subject}>{v.subject}</label>
                    </li>
                  ))}
                />
              </div>
            )}
            <div className={`products ${subject && 'isSubject'}`}>
              {products.map((item) => (
                <ProductView
                  key={item.id}
                  item={item}
                  ids={products.map((v) => v.id)}
                  current={-1}
                  isLoading={plistLoad}
                  isFetching={plistFet}
                  isError={plistErr}
                  wid="25%"
                />
              ))}
              <Box wid="100%">
                <More className="more">
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
                        setPageAction(true);
                      }}
                      disabled={plistFet}
                    >
                      Load More
                    </button>
                  )}
                </More>
              </Box>
            </div>
          </Inner>
        </ClothingBox>
      )}
    </>
  );
};

export default Category;
