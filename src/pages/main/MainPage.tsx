import React from 'react';
import { Box, Container } from '../../components/Styled';
import styled from 'styled-components';
import MainBg from './MainBg';
import Header from './Header';
import ProductSlider from './ProductSlider';
import {
  initialProductList,
  initialProductSubject,
  initialProductType,
  useGetMainProductsQuery,
  useGetNewProductsQuery,
  useGetTypeQuery,
} from '../../app/apiSlice';
import Changer from './Changer';

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
  const {
    data: newArrivials = {
      data: initialProductList,
    },
    isLoading: newIsLoad,
    isSuccess: newIsSuc,
    isError: newIsErr,
  } = useGetNewProductsQuery();
  const {
    data: type = {
      data: [initialProductType],
    },
    isLoading: typeIsLoad,
    isSuccess: typeIsSuc,
    isError: typeIsErr,
  } = useGetTypeQuery();
  const {
    data: mainArrivials = {
      data: {
        subject: initialProductSubject,
        list: initialProductList,
      },
    },
    isLoading: mainIsLoad,
    isSuccess: mainIsSuc,
    isError: mainIsErr,
  } = useGetMainProductsQuery();
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
          <ProductSlider
            items={newArrivials.data}
            isLoading={newIsLoad}
            isSuccess={newIsSuc}
            isError={newIsErr}
          />
        </Box>
        <Box pa="25px" bg="#000">
          <Changer
            items={type.data}
            isLoading={typeIsLoad}
            isSuccess={typeIsSuc}
            isError={typeIsErr}
          />
        </Box>
        <Box pa="25px" bg="#fff">
          <Header text="Jacket new arrivials" />
          <ProductSlider
            items={mainArrivials.data.list}
            isLoading={mainIsLoad}
            isSuccess={mainIsSuc}
            isError={mainIsErr}
          />
        </Box>
        <Box pa="25px" bg="#808080">
          <Changer
            items={[
              {
                id: mainArrivials.data.subject.id,
                type: mainArrivials.data.subject.subject,
                image: mainArrivials.data.subject.image,
              },
            ]}
            isLoading={mainIsLoad}
            isSuccess={mainIsSuc}
            isError={mainIsErr}
          />
        </Box>
      </Container>
    </>
  );
};

export default MainPage;
