import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Button, FlexBox, GlobalProps } from '../../components/Styled';
import loadingImg from '../../img/LOADING.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from '@fortawesome/free-regular-svg-icons';
import { faSquare as faSquareA } from '@fortawesome/free-solid-svg-icons';
import { faSquare as faSquareB } from '@fortawesome/free-regular-svg-icons';

const ImageBox = styled(FlexBox)`
  position: relative;
  justify-content: flex-start;
  overflow: hidden;

  img {
    padding: 25px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: 0.3s transform ease-in;
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

interface ProductImageSlider extends GlobalProps {
  isLoading: boolean;
  images: string;
}

const ProductImageSlider = ({
  isLoading,
  images,
  wid = '100%',
  minWid,
  hei = '100%',
  minHei,
}: ProductImageSlider) => {
  const [current, setCurrent] = useState(0);
  const image_array = images.split('/');
  const currentHandler = (type: 'left' | 'right') => {
    if (type === 'left') {
      setCurrent((prev) => {
        if (prev === 0) return image_array.length - 1;
        return prev - 1;
      });
      return;
    }
    setCurrent((prev) => {
      if (prev === image_array.length - 1) return 0;
      return prev + 1;
    });
  };
  return (
    <>
      <ImageBox wid={wid} minWid={minWid} hei={hei} minHei={minHei}>
        {image_array.map((image) => (
          <LazyLoadImage
            key={image}
            className={isLoading ? 'loading' : ''}
            src={
              isLoading
                ? loadingImg
                : `${process.env.REACT_APP_SERVER_URL}/files/${image}`
            }
            alt={image}
            style={{
              transform: `translateX(${-100 * current}%)`,
            }}
            draggable={false}
          />
        ))}
        {current !== 0 && (
          <Button
            posit="absolute"
            top="50%"
            left="5px"
            transform="translateY(-50%)"
            filter="drop-shadow(3px 3px 3px #fff)"
            onClick={() => currentHandler('left')}
          >
            <FontAwesomeIcon icon={faSquareCaretLeft} size="2xl" />
          </Button>
        )}
        {current !== image_array.length - 1 && (
          <Button
            posit="absolute"
            top="50%"
            right="5px"
            transform="translateY(-50%)"
            filter="drop-shadow(3px 3px 3px #fff)"
            onClick={() => currentHandler('right')}
          >
            <FontAwesomeIcon icon={faSquareCaretRight} size="2xl" />
          </Button>
        )}
        <Box
          posit="absolute"
          left="50%"
          bottom="0"
          transform="translateX(-50%)"
        >
          {image_array.map((_, i) => (
            <Button key={i} pa="0" onClick={() => setCurrent(i)}>
              <FontAwesomeIcon icon={current === i ? faSquareA : faSquareB} />
            </Button>
          ))}
        </Box>
      </ImageBox>
    </>
  );
};

export default ProductImageSlider;
