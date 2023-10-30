import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import { Banner, useGetBannerQuery } from '../../app/apiSlice';

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
    font-size: 1.5rem;
    color: #fff;
    text-align: center;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: 1s all ease-in;
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

interface BannerProps {
  type: 'type' | 'subject' | 'banner';
  name?: string;
  title?: string;
  main?: boolean;
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
  height = '500px',
  pa = '25px',
  bg = '#000',
}: BannerProps): JSX.Element => {
  const {
    data: getBanner,
    isLoading,
    isSuccess,
    isError,
  } = useGetBannerQuery({ type, name });

  const [items, setItems] = useState<Banner[]>([
    {
      id: -1,
      banner: 'LOADING',
      image: 'LOADING.png',
    },
  ]);
  const [current, setCurrent] = useState<number>(0);
  const timer = useRef<Timer | undefined>(undefined);

  useLayoutEffect(() => {
    if (isSuccess) {
      if (main) {
        setItems(getBanner.data.filter((v) => v.show_main));
      } else {
        setItems(getBanner.data); // set readState
      }
    } else if (isError) {
      // set errorState
      setItems([
        {
          id: -1,
          banner: 'error',
          image: 'ERROR.png',
        },
      ]);
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
                src={`${process.env.REACT_APP_SERVER_URL}/files/${item.image}`}
                alt={item.image}
              />
              {(type === 'type' || type === 'subject') && (
                <a href="#" className={`${i === current && 'show'}`}>
                  <p>{item.banner}</p>
                  {!isLoading && <p>SHOP OPEN</p>}
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
