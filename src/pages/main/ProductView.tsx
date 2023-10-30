import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import loadingImage from '../../img/LOADING.png';
import errorImage from '../../img/ERROR.png';
import { ProductList } from '../../app/apiSlice';

const ProductViewBox = styled(Box)`
  padding: 10px;
  position: relative;
  width: ${(props) => props.wid};
  min-width: ${(props) => props.minWid};
  max-width: ${(props) => props.maxWid};
  overflow: hidden;
  transition: 0.3s all ease-in;

  &:hover {
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

  &:active {
    * {
      filter: blur(1px);
    }
  }

  .image-box {
    padding-top: 100%;
    position: relative;
    overflow: hidden;
  }

  .image,
  .hover {
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    object-fit: cover;
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

  .point {
    padding: 3px 15px;
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    background: #777;
    font-size: 0.9rem;
    font-weight: 100;
    color: #fff;
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
`;

interface ProductViewProps {
  item: ProductList;
  ids?: number[];
  message?: string;
  current: number;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  wid?: string;
  minWid?: string;
  maxWid?: string;
}

const ProductView = ({
  item,
  ids,
  message,
  current,
  isLoading,
  isFetching,
  isError,
  wid,
  minWid,
  maxWid,
}: ProductViewProps): JSX.Element => {
  const navigator = useNavigate();
  const imgArray = item.image.split('/');
  const style = {
    transform: current === -1 ? 'unset' : `translateX(-${100 * current}%)`,
  };

  return (
    <>
      <ProductViewBox
        wid={wid}
        minWid={minWid}
        maxWid={maxWid}
        style={style}
        onClick={() => {
          if (isError || isLoading) return;
          navigator(`/product/${item.id}`, {
            state: {
              ids,
            },
          });
        }}
      >
        <div className="image-box">
          <img
            className={`image ${
              (isLoading || item.image === 'LOADING.png') && 'loading'
            }`}
            src={`${
              isLoading
                ? loadingImage
                : isError
                ? errorImage
                : `${process.env.REACT_APP_SERVER_URL}/files/${imgArray[0]}`
            }`}
            alt={imgArray[0]}
          />
          {imgArray[1] && (
            <img
              className="hover"
              src={`${
                isLoading
                  ? loadingImage
                  : isError
                  ? errorImage
                  : `${process.env.REACT_APP_SERVER_URL}/files/${imgArray[1]}`
              }`}
              alt={imgArray[1]}
            />
          )}
          {message && <div className="point">{message}</div>}
          <div className="view">Quick View</div>
        </div>
        <p className="name">{isLoading ? 'loading' : item.name}</p>
        <p className="price">
          \{isLoading ? '999,999' : item.price.toLocaleString()}
        </p>
      </ProductViewBox>
    </>
  );
};

export default ProductView;
