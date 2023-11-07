import React, { useLayoutEffect } from 'react';
import { Box, Container } from '../../components/Styled';
import styled from 'styled-components';
import MainBg from './MainBg';
import ProductSlider from './ProductSlider';
import ProductBanner from './ProductBanner';
import ProductSubject from './ProductSubject';
import InstaFeeds from './InstaFeeds';
import { useNavigate } from 'react-router-dom';

const StyledBox = styled(Box)`
  margin-top: 30vh;
  margin-left: 30vw;
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;

  a {
    display: inline-block;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: 0.3s all ease-in;

    &:hover {
      color: #fff;
    }
  }

  h1 {
    font-size: 3rem;
    line-height: 2.5rem;
  }

  h4 {
    font-size: 1.5rem;
    line-height: 1.5rem;
  }

  h3 {
    margin-top: 5px;
    margin-left: 50px;
  }
`;

const MainPage = (): JSX.Element => {
  const navigator = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <MainBg />
      <Container mt="100px" posit="relative" wid="100%" overflow="hidden">
        <Box posit="relative" minHei="calc(70dvh - 15px)">
          <StyledBox>
            <a
              onClick={() => {
                navigator('/new');
              }}
            >
              <h4>Just In</h4>
              <h1>New Season</h1>
              <h1>Arrival</h1>
              <h3>SHOP NOW</h3>
            </a>
          </StyledBox>
        </Box>
        <ProductSlider order="new" text="new arrivials" />
        <ProductBanner type="type" open />
        <ProductSlider order="main" text="jacket new arrivials" />
        <ProductBanner type="subject" main bg="#828282" open />
        <ProductSlider order="popular" text="most popular" />
        <ProductSubject />
        <InstaFeeds />
      </Container>
    </>
  );
};

export default MainPage;
