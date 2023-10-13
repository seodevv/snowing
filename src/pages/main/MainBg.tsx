import React from 'react';
import { Container, Img } from '../../components/Styled';
import Image from '../../img/main.jpg';

const MainBg = (): JSX.Element => {
  return (
    <>
      <Container posit="fixed" top="100px" wid="100%" hei="100dvh">
        <Img src={Image} alt="main" wid="100%" hei="100%" objFit="cover" />
      </Container>
    </>
  );
};

export default MainBg;
