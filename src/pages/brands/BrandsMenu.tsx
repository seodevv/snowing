import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import { Brands, useGetBrandsQuery } from '../../app/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetFilter } from '../../app/slice';

const MenuBox = styled(Box)<{ active?: boolean }>`
  position: fixed;
  top: ${(props) => (props.active ? '100px' : '-300px')};
  z-index: -1;
  width: 100%;
  height: 400px;
  background: #fff;
  box-shadow: 0 0 5px #777;
  transition: 0.3s top ease-in;
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
      font-weight: bold;
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
    flex-flow: row nowrap;
    width: 200%;
    height: 100%;
    overflow: hidden;

    &:hover {
      img {
        transform: translateX(-100%);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.3s all ease-in;
    }

    .border {
      position: absolute;
      top: 0px;
      left: 0px;
      width: calc(50% - 15px);
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

  const [brands, setBrands] = useState<Brands[]>(
    Array(1)
      .fill(undefined)
      .map((v, i) => ({
        id: -1,
        brand: 'loading',
        logo: '',
      }))
  );
  const [images, setImages] = useState<string[]>([]);

  const { data: getBrands, isSuccess, isError } = useGetBrandsQuery();

  useLayoutEffect(() => {
    if (isSuccess) {
      setBrands(getBrands.data);
    } else if (isError) {
      setBrands([
        {
          id: -1,
          brand: 'error',
          logo: '',
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
              <img src="https://localhost:8080/files/VELVET ZIP-UP JACKET_SKY_BLUE_1.png" />
              <img src="https://localhost:8080/files/VELVET ZIP-UP JACKET_SKY_BLUE_2.png" />
              <div className="border"></div>
            </div>
          </BrandsImage>
        </Inner>
      </MenuBox>
    </>
  );
};

export default BrandsMenu;
