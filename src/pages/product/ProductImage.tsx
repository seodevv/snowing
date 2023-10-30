import React from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';

const ImageBox = styled(Box)`
  padding: 0 25px;
  flex: 6;
  height: 75dvh;
  animation: fade-in 0.3s ease-in;

  img {
    width: 100%;
    object-fit: contain;
  }
`;

interface ProductImageProps {
  images: string;
  status: number;
}

const ProductImage = ({ images, status }: ProductImageProps) => {
  const image = images.split('/')[status];

  return (
    <>
      <ImageBox key={image}>
        <img src={`${process.env.REACT_APP_SERVER_URL}/files/${image}`} />
      </ImageBox>
    </>
  );
};

export default ProductImage;
