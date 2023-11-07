import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import { Banner, useGetBannerQuery } from '../../app/apiSlice';
import LoadingImage from '../../img/LOADING.png';
import { useNavigate } from 'react-router-dom';

const BannerBox = styled(FlexBox)`
  .image-box {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    visibility: hidden;
    opacity: 0;
    filter: brightness(50%);
    transition: 1s all ease-in;
  }

  a {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    font-size: 1.5rem;
    color: #fff;
    text-align: center;
    text-decoration: underline;
    visibility: hidden;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: 1s visibility ease-in;
    transition: 1s opacity ease-in;
    cursor: pointer;

    &:hover {
      font-weight: bold;
      text-decoration: underline;
      text-shadow: 3px 3px 1px #ccc, 4px 4px 1px #ccc, 5px 5px 1px #ccc;
    }

    &:active {
      filter: blur(1px);
      transition: none;
    }
  }

  p {
    text-shadow: 2px 3px 7px white, 0 10px 1px #a1a1a1;
  }

  .show,
  .banner {
    visibility: visible;
    opacity: 1;
  }

  .banner {
    user-select: none;
    cursor: unset;
  }

  .loading {
    background: repeating-linear-gradient(
      45deg,
      #000000 150px,
      #070707 250px,
      #000000 300px
    );
    background-size: 500% 500%;
    animation: gradient 15s ease infinite;
    filter: blur(3px);
  }
`;

const initialBanner = {
  id: -1,
  category: '',
  banner: 'LOADING',
  image: '',
};

const errorBanner = {
  id: -1,
  category: '',
  banner: 'ERROR',
  image: '',
};

interface BannerProps {
  type: 'type' | 'subject' | 'banner';
  name?: string;
  title?: string;
  main?: boolean;
  open?: boolean;
  pa?: string;
  height?: string;
  bg?: string;
}

type Timer = ReturnType<typeof setInterval>;

const ProductBanner = ({
  type = 'type',
  name = '',
  title,
  main = false,
  open = false,
  height = '500px',
  pa = '25px',
  bg = '#000',
}: BannerProps): JSX.Element => {
  const navigator = useNavigate();

  const {
    data: getBanner,
    isLoading,
    isSuccess,
    isError,
  } = useGetBannerQuery({ type, name });

  const [items, setItems] = useState<Banner[]>([initialBanner]);
  const [current, setCurrent] = useState<number>(0);
  const timer = useRef<Timer | undefined>(undefined);

  useLayoutEffect(() => {
    if (isSuccess) {
      if (main) {
        setItems(getBanner.data.filter((v) => v.show_main));
      } else {
        setItems(getBanner.data);
      }
    } else if (isError) {
      setItems([errorBanner]);
    }
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    if (items.length !== 1) {
      timer.current = setInterval(() => {
        setCurrent((prev) => {
          if (!type) return prev;
          if (prev === type.length - 1) return 0;
          return prev + 1;
        });
      }, 3000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [items]);

  return (
    <>
      <Box pa={pa} bg={bg}>
        <BannerBox
          posit="relative"
          flexJustCon="center"
          flexAlignItem="center"
          wid="100%"
          hei={height}
          bg="#000"
          overflow="hidden"
        >
          {items.map((item, i) => (
            <div key={item.id} className="image-box">
              <img
                className={`${isLoading && 'loading'} ${
                  i === current && 'show'
                }`}
                src={
                  isLoading
                    ? LoadingImage
                    : `${process.env.REACT_APP_SERVER_URL}/files/${item.image}`
                }
                alt={item.image}
              />
              {(type === 'type' || type === 'subject') && (
                <a
                  className={`${i === current && 'show'}`}
                  onClick={() => {
                    if (type === 'type' && item.category) {
                      navigator(
                        `/${item.category.toLowerCase()}/${item.banner.toLowerCase()}`
                      );
                    } else if (
                      type === 'subject' &&
                      item.type &&
                      item.category
                    ) {
                      navigator(
                        `/${item.category.toLowerCase()}/${item.type.toLowerCase()}/${item.banner.toLowerCase()}`
                      );
                    }
                  }}
                >
                  <p>{item.banner}</p>
                  {!isLoading && open && <p>SHOP OPEN</p>}
                </a>
              )}
              {type === 'banner' && (
                <a className="banner">
                  <p>{title ? title.toUpperCase() : name.toUpperCase()}</p>
                </a>
              )}
            </div>
          ))}
        </BannerBox>
      </Box>
    </>
  );
};

export default ProductBanner;
