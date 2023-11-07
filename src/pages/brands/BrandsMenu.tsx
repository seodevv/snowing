import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import { Brands, useGetBrandsQuery } from '../../app/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter } from '../../app/slice';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const MenuBox = styled(Box)<{ active?: boolean }>`
  position: fixed;
  top: ${(props) => (props.active ? '100px' : '-300px')};
  z-index: -1;
  width: 100%;
  height: 400px;
  background: #fff;
  box-shadow: 0 0 5px #777;
  transition: 0.3s top ease-in;
  overflow: hidden;
`;

const Inner = styled(Box)`
  margin: auto;
  padding: 25px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  max-width: 980px;
  height: 100%;
`;

const BrandsList = styled(Box)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: flex-start;
  width: calc(100% - 350px);
  height: 100%;

  > div {
    padding: 10px;
  }

  .title {
    width: 100%;
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .brand {
    margin-right: 10px;
    font-size: 1.05rem;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 100;
    color: #444;
    letter-spacing: -1.5px;
    word-spacing: -3px;
    transition: 0.1s all ease-in;
    user-select: none;
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
`;

const BrandsImage = styled(Box)`
  width: 350px;
  height: 350px;
  overflow: hidden;

  .image-box {
    margin: 15px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 15px);
      height: calc(100% - 15px);
      border: 10px groove rgba(0, 0, 0, 0.75);
      object-fit: cover;
      visibility: hidden;
      opacity: 0;
      transition: 0.8s all ease-in;
      cursor: pointer;
    }

    img.visible {
      visibility: visible;
      opacity: 1;
    }

    .border {
      position: absolute;
      top: 0;
      left: 0;
      width: calc(100% - 15px);
      height: calc(100% - 15px);
      border: 10px double rgba(255, 255, 255, 0.75);
    }
  }
`;

interface BrandsMenuProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<string>>;
}

const BrandsMenu = ({ active, setActive }: BrandsMenuProps) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [brands, setBrands] = useState<Brands[]>([]);
  const [images, setImages] = useState<Pick<Brands, 'brand' | 'image'>[]>([]);
  const [current, setCurrent] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();

  const { data: getBrands, isSuccess, isError } = useGetBrandsQuery({});

  useLayoutEffect(() => {
    if (active) {
      timer.current = setInterval(() => {
        setCurrent((prev) => {
          if (prev === images.length - 1) return 0;
          return prev + 1;
        });
      }, 2000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [active]);

  useLayoutEffect(() => {
    if (isSuccess) {
      setBrands(getBrands.data);
      setImages(
        getBrands.data
          .filter((v) => typeof v.image === 'string')
          .map((v) => ({
            brand: v.brand,
            image: v.image,
          }))
      );
    } else if (isError) {
      setBrands([
        {
          id: -1,
          brand: 'error',
          logo: '',
          desc: '',
          image: '',
          category: '',
        },
      ]);
    }
  }, [isSuccess, isError]);

  return (
    <>
      <MenuBox active={active} onMouseLeave={() => setActive('idle')}>
        <Inner>
          <BrandsList>
            <div className="title">
              <span>BRANDS</span>
            </div>
            {brands.map((v) => (
              <div
                key={v.id}
                className="brand"
                onClick={() => {
                  dispatch(resetFilter());
                  navigator(`/brands/${v.brand}`);
                  setActive('idle');
                }}
              >
                <span>{v.brand}</span>
              </div>
            ))}
          </BrandsList>
          <BrandsImage>
            <div className="image-box">
              {images.map((v, i) => (
                <LazyLoadImage
                  key={v.brand}
                  className={i === current ? 'visible' : ''}
                  src={`${process.env.REACT_APP_SERVER_URL}/files/${v.image}`}
                  alt={v.image ? v.image : 'brand'}
                />
              ))}
              <div className="border"></div>
            </div>
          </BrandsImage>
        </Inner>
      </MenuBox>
    </>
  );
};

export default BrandsMenu;
