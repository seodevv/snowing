import React from 'react';
import { Box, Container, FlexBox, Img } from '../../components/Styled';
import styled from 'styled-components';
import MainBg from './MainBg';
import Header from './Header';
import ProductSlider from './ProductSlider';

const StyledBox = styled(Box)`
  margin-top: 30vh;
  margin-left: 30vw;

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
  return (
    <>
      <MainBg />
      <Container mt="100px" posit="relative" wid="100%" overflow="hidden">
        <Box posit="relative" minHei="calc(70dvh - 15px)">
          <StyledBox>
            <a href="#">
              <h4>Just In</h4>
              <h1>New Season</h1>
              <h1>Arrival</h1>
              <h3>SHOP NOW</h3>
            </a>
          </StyledBox>
        </Box>
        <Box pa="25px" bg="#fff">
          <Header text="new arrivials" />
          <ProductSlider />
        </Box>
      </Container>
    </>
  );
};

export default MainPage;
