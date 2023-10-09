import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import { ProductType, ProductTypeResponse } from '../../app/apiSlice';

const ChangerBox = styled(FlexBox)`
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

  .show {
    visibility: visible;
    opacity: 1;
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

interface ChangerProps {
  items: ProductType[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  height?: string;
}

type Timer = ReturnType<typeof setInterval>;

const Changer = ({
  items,
  isLoading,
  isSuccess,
  isError,
  height = '500px',
}: ChangerProps): JSX.Element => {
  const [type, setType] = useState<ProductType[] | undefined>(undefined);
  const [current, setCurrent] = useState<number>(0);
  const timer = useRef<Timer | undefined>(undefined);

  useLayoutEffect(() => {
    if (isLoading) {
      setType(items); // set initialState
    } else if (isSuccess) {
      setType(items); // set readState
    } else if (isError) {
      // set errorState
      setType([
        {
          id: -1,
          type: 'error',
          image: 'ERROR.png',
        },
      ]);
    }
  }, [isLoading, isSuccess, isError]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrent((prev) => {
        if (!type) return prev;
        if (prev === type.length - 1) return 0;
        return prev + 1;
      });
    }, 3000);
    return () => {
      clearInterval(timer.current);
    };
  }, [type]);

  return (
    <>
      <ChangerBox
        posit="relative"
        flexJustCon="center"
        flexAlignItem="center"
        wid="100%"
        hei={height}
        bg="#000"
        overflow="hidden"
      >
        {type?.map((item, i) => (
          <div key={item.id} className="image-box">
            <img
              className={`${isLoading && 'loading'} ${i === current && 'show'}`}
              src={`${process.env.REACT_APP_SERVER_URL}/files/${item.image}`}
              alt={item.image}
            />
            <a className={`title ${i === current && 'show'}`}>
              <p>{item.type}</p>
              {!isLoading && <p>SHOP OPEN</p>}
            </a>
          </div>
        ))}
      </ChangerBox>
    </>
  );
};

export default Changer;
