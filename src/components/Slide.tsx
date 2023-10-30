import React, { Dispatch, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import { Box } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SlideBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 560px;
  user-select: none;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      border: none;
    }

    &:hover {
      opacity: 0.3;
    }

    &:active {
      opacity: 0.75;
    }
  }

  .item + .item {
    margin-top: 10px;
  }

  .select {
    img {
      border: 2px solid #ff5714;
    }

    &:hover {
      filter: unset;
    }
  }
`;

interface SlideProps {
  images: string;
  status: number;
  setStatus: Dispatch<SetStateAction<number>>;
}

const Slide = ({ images, status, setStatus }: SlideProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const maxLength = images.split('/').length - 1;

  const onScrollHandler = (index: number) => {
    if (!scrollRef.current) return;

    const target = document.querySelector('#image-' + index);
    if (!target) return;

    const scrollY = scrollRef.current.getBoundingClientRect().y;
    const scrollTop = scrollRef.current.scrollTop;
    const targetY = target.getBoundingClientRect().y;

    scrollRef.current.scrollTo({
      top: scrollTop + targetY - scrollY,
      behavior: 'smooth',
    });
  };

  const onClickPrevImage = () => {
    if (status === 0) {
      setStatus(maxLength);
      onScrollHandler(maxLength);
    } else {
      setStatus((prev) => prev - 1);
      onScrollHandler(status - 1);
    }
  };

  const onClickNextImage = () => {
    if (status === maxLength) {
      setStatus(0);
      onScrollHandler(0);
    } else {
      setStatus((prev) => prev + 1);
      onScrollHandler(status + 1);
    }
  };

  return (
    <>
      <SlideBox className="slide">
        <div className="item">
          <FontAwesomeIcon
            icon={faChevronUp}
            size="lg"
            onClick={() => onClickPrevImage()}
          />
        </div>
        <Box
          ref={scrollRef}
          flexGrow={1}
          maxHei="calc(100% - 40px)"
          overflow="scroll"
          className="scroll-none"
        >
          {images.split('/').map((image, i) => (
            <div
              key={image}
              id={'image-' + i}
              className={`item ${i === status && 'select'}`}
              onClick={() => {
                setStatus(i);
                onScrollHandler(i);
              }}
            >
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/files/${image}`}
                alt={image}
              />
            </div>
          ))}
        </Box>
        <div className="item">
          <FontAwesomeIcon
            icon={faChevronDown}
            size="lg"
            onClick={() => onClickNextImage()}
          />
        </div>
      </SlideBox>
    </>
  );
};

export default Slide;
