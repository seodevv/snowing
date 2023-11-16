import React from 'react';
import styled from 'styled-components';
import { Box, GlobalProps } from '../../components/Styled';
import loadingImg from '../../img/LOADING.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ImageBox = styled(Box)`
  padding: 0 25px;
  flex: 6;
  animation: fade-in 0.3s ease-in;

  img {
    width: 100%;
    object-fit: contain;
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
`;

interface ProductImageProps extends GlobalProps {
  isLoading: boolean;
  images: string;
  status: number;
}

const ProductImage = ({
  isLoading,
  images,
  status,
  hei = '75dvh',
}: ProductImageProps) => {
  const image = images.split('/')[status];
  return (
    <>
      <ImageBox key={image} hei={hei}>
        <LazyLoadImage
          className={isLoading ? 'loading' : ''}
          src={
            isLoading
              ? loadingImg
              : `${process.env.REACT_APP_SERVER_URL}/files/${image}`
          }
        />
      </ImageBox>
    </>
  );
};

export default ProductImage;
