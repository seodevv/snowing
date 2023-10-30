import React from 'react';
import { Img } from '../../components/Styled';
import Image from '../../img/main.jpg';
import styled from 'styled-components';

const MainBgBox = styled.section`
  position: fixed;
  top: 100px;
  width: 100%;
  height: 100dvh;
  animation: fade-in 0.3s ease-in;
`;

const MainBg = (): JSX.Element => {
  return (
    <>
      <MainBgBox>
        <Img src={Image} alt="main" wid="100%" hei="100%" objFit="cover" />
      </MainBgBox>
    </>
  );
};

export default MainBg;
