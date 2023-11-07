import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { MenuBox } from '../pages/brands/BrandsMenu';
import styled from 'styled-components';
import { Box } from './Styled';
import {
  Brands,
  Category,
  useGetBrandsQuery,
  useGetProductCategoryQuery,
} from '../app/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter } from '../app/slice';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Inner = styled(Box)`
  margin: auto;
  padding: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  max-width: 980px;
  height: 100%;
  overflow: hidden;

  .title {
    margin: 15px 0;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 0.5px;
  }
`;

const TypeBox = styled(Box)`
  flex: 1;
  max-width: 300px;
  border-right: 2px solid #000;

  .type {
    display: flex;
    flex-flow: row nowrap;

    .item {
      flex: 1;
      font-size: 1.1rem;
      list-style: none;
      line-height: 2rem;
      letter-spacing: 0.5px;
      cursor: pointer;

      p {
        margin: 5px 0;
        padding: 0 12px;
        position: relative;
        left: -12px;
        display: inline-block;
        font-weight: bold;
        transition: 0.1s all ease-in;

        &:hover {
          background: #000;
          color: #fff;
        }

        &:active {
          filter: blur(1px);
          transition: none;
        }
      }

      li {
        color: #777;
        transition: 0.1s all ease-in;

        &:hover {
          padding-left: 12px;
          border-left: 2px solid #000;
          font-weight: bold;
          color: #000;
          text-decoration: underline;
        }

        &:active {
          filter: blur(1px);
          transition: none;
        }
      }
    }
  }
`;

const BrandBox = styled(Box)`
  padding: 0 15px;
  flex: 1.5;

  .title {
    text-align: center;
  }

  .list {
    display: flex;
    flex-flow: row wrap;
    letter-spacing: 0.5px;

    li {
      padding: 10px;
      display: inline-block;
      color: #777;
      transition: 0.1s all ease-in;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
        text-shadow: 3px 3px 1px #ccc, 4px 4px 1px #ccc, 5px 5px 1px #ccc;
        transform: scale(1.3);
      }

      &:active {
        filter: blur(1px);
        transition: none;
      }
    }
  }
`;

const ImageBox = styled(Box)`
  flex: 1;

  .image-box {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 10px double #000;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      visibility: hidden;
      opacity: 0;
      transition: 0.8s all ease-in;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }

      &:active {
        opacity: 0.75;
      }
    }

    img.visible {
      visibility: visible;
      opacity: 1;
    }
  }
`;

interface MenuProps {
  menu: string;
  active: boolean;
  setActive: Dispatch<SetStateAction<string>>;
}

const Menu = ({ menu, active, setActive }: MenuProps) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [category, setCategory] = useState<Category[]>([]);
  const [types, setTypes] = useState<string[]>(['type1', 'type2']);
  const [brands, setBrands] = useState<Brands[]>([]);
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const {
    data: getCategory,
    isLoading: catIsLoad,
    isSuccess: catIsSuc,
    isError: catIsErr,
  } = useGetProductCategoryQuery(menu);

  const {
    data: getBrands,
    isLoading: brdIsLoad,
    isSuccess: brdIsSuc,
    isError: brdIsErr,
  } = useGetBrandsQuery({ category: menu });

  useLayoutEffect(() => {
    if (catIsSuc) {
      setTypes([...new Set(getCategory.data.map((v) => v.type))]);
      setCategory(getCategory.data);
    } else if (catIsErr) {
      setTypes(['server error']);
    }
  }, [catIsSuc, catIsErr]);

  useLayoutEffect(() => {
    if (brdIsSuc) {
      setBrands(getBrands.data);
    } else if (brdIsErr) {
      setBrands([
        {
          id: -1,
          brand: 'server error',
          logo: '',
          desc: '',
          image: '',
          category: '',
        },
      ]);
    }
  }, [brdIsSuc, brdIsErr]);

  useLayoutEffect(() => {
    if (active) {
      timer.current = setInterval(() => {
        setCurrent((prev) => {
          if (prev === brands.length - 1) return 0;
          return prev + 1;
        });
      }, 2000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [active]);

  return (
    <>
      <MenuBox active={active} onMouseLeave={() => setActive('idle')}>
        <Inner>
          <TypeBox>
            <div className="title">
              <span>{menu.toUpperCase()} CATEGORIES</span>
            </div>
            <div className="type">
              {types.map((type) => (
                <div key={type} className="item">
                  <p
                    onClick={() => {
                      if (catIsLoad || catIsErr) return;
                      navigator(`/${menu}/${type.toLowerCase()}`);
                      setActive('idle');
                      dispatch(resetFilter());
                    }}
                  >
                    {type}
                  </p>
                  {category
                    .filter((v) => v.type === type)
                    .map((v) => (
                      <li
                        key={v.id}
                        onClick={() => {
                          if (catIsLoad || catIsErr) return;
                          navigator(
                            `/${menu}/${type.toLowerCase()}/${v.subject.toLowerCase()}`
                          );
                          setActive('idle');
                          dispatch(resetFilter());
                        }}
                      >
                        {v.subject}
                      </li>
                    ))}
                </div>
              ))}
            </div>
          </TypeBox>
          <BrandBox>
            <div className="title">
              <span>{menu.toUpperCase()} BRANDS</span>
            </div>
            <div className="list">
              {brands.map((v) => (
                <li
                  key={v.id}
                  onClick={() => {
                    if (brdIsLoad || brdIsErr) return;
                    navigator(`/brands/${v.brand}`);
                    setActive('idle');
                    dispatch(resetFilter());
                  }}
                >
                  {v.brand}
                </li>
              ))}
            </div>
          </BrandBox>
          <ImageBox>
            <div className="image-box">
              {brands.map((v, i) => (
                <LazyLoadImage
                  key={v.id}
                  className={`${i === current && 'visible'}`}
                  src={`${process.env.REACT_APP_SERVER_URL}/files/${v.logo}`}
                  alt={v.logo}
                  onClick={() => {
                    navigator(`/brands/${v.brand}`);
                    setActive('idle');
                    dispatch(resetFilter());
                  }}
                />
              ))}
            </div>
          </ImageBox>
        </Inner>
      </MenuBox>
    </>
  );
};

export default Menu;
