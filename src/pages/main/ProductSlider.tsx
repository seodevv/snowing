import React, { useLayoutEffect, useState } from 'react';
import { FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import { ProductList, ProductListResponse } from '../../app/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const Items = styled(FlexBox)`
  position: relative;
  width: 100%;

  .item {
    padding: 10px;
    position: relative;
    min-width: 25%;
    overflow: hidden;
    transition: 0.3s all ease-in;
  }

  .loading {
    background: repeating-linear-gradient(
      45deg,
      #c7cedd 50px,
      #cbd2e2 100px,
      #c7cedd 150px
    );
    background-size: 500% 500%;
    animation: gradient 10s ease infinite;
    filter: blur(3px);
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .item:hover {
    cursor: pointer;

    .image {
      visibility: hidden;
      opacity: 0;
    }
    .hover {
      visibility: visible;
      opacity: 1;
    }
    .view {
      bottom: 0px;
      background: #000;
      visibility: visible;
      opacity: 1;
    }
  }

  .item:active {
    * {
      filter: blur(1px);
    }
  }

  .image-box {
    padding-top: 100%;
    position: relative;
  }

  .image,
  .hover {
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: 0.3s all ease-in;
  }

  .hover {
    visibility: hidden;
    opacity: 0;
  }

  .name,
  .price {
    font-size: 0.85rem;
    font-style: italic;
    text-align: center;
  }

  .name {
    margin-top: 10px;
  }

  .price {
    font-weight: bold;
  }

  .view {
    padding: 10px;
    position: absolute;
    bottom: -30px;
    width: 100%;
    background: #fff;
    font-size: 0.95rem;
    text-align: center;
    color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s all ease-in;
  }

  .left,
  .right {
    padding: 15px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
`;

const ProductView = ({
  name,
  image,
  price,
  current,
  isLoading,
}: Pick<ProductList, 'name' | 'image' | 'price'> & {
  current: number;
  isLoading: boolean;
}): JSX.Element => {
  const imgArray = image.split('/');
  const style = {
    transform: current === -1 ? 'unset' : `translateX(-${100 * current}%)`,
  };
  return (
    <>
      <div className="item" style={style}>
        <div className="image-box">
          <img
            className={`image ${isLoading && 'loading'}`}
            src={`${process.env.REACT_APP_SERVER_URL}/files/${imgArray[0]}`}
            alt={imgArray[0]}
          />
          {imgArray[1] && (
            <img
              className="hover"
              src={`${process.env.REACT_APP_SERVER_URL}/files/${imgArray[1]}`}
              alt={imgArray[1]}
            />
          )}
          <div className="view">Quick View</div>
        </div>
        <p className="name">{name}</p>
        <p className="price">\{price.toLocaleString()}</p>
      </div>
    </>
  );
};

interface ProductSliderProps {
  items: ProductList[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

const ProductSlider = ({
  items,
  isLoading,
  isSuccess,
  isError,
}: ProductSliderProps): JSX.Element => {
  const [products, setProducts] = useState<ProductList[] | undefined>(
    undefined
  );
  const [current, setCurrent] = useState<number>(-1);

  const currentChangeAction = (type: 'left' | 'right') => {
    if (!products) return;
    switch (type) {
      case 'left':
        if (current === 0) {
          setCurrent(products.length - 4);
        } else {
          setCurrent((prev) => prev - 1);
        }
        break;
      case 'right':
        if (current === products.length - 4) {
          setCurrent(0);
        } else {
          setCurrent((prev) => prev + 1);
        }
        break;
    }
  };

  useLayoutEffect(() => {
    if (isLoading) {
      setProducts(items); // initialState
    } else if (isSuccess) {
      setProducts(items); // realState
      setCurrent(items.length <= 4 ? -1 : parseInt(items.length / 2 + ''));
    } else if (isError) {
      setProducts(
        // errorState
        Array(4)
          .fill(undefined)
          .map((_, i) => ({
            id: i,
            name: 'Network Error. Please try again',
            image: 'ERROR.png',
            price: 999999,
          }))
      );
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <>
      <FlexBox wid="100%" flexDir="row" flexWrap="nowrap" overflow="hidden">
        <Items>
          {products?.map((item) => (
            <ProductView
              key={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
              current={current}
              isLoading={isLoading}
            />
          ))}
          {current !== -1 && (
            <>
              <FontAwesomeIcon
                className="left btn-effect"
                icon={faChevronLeft}
                size="xl"
                onClick={() => currentChangeAction('left')}
              />
              <FontAwesomeIcon
                className="right btn-effect"
                icon={faChevronRight}
                size="xl"
                onClick={() => currentChangeAction('right')}
              />
            </>
          )}
        </Items>
      </FlexBox>
    </>
  );
};

export default ProductSlider;
