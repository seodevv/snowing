import React from 'react';
import styled from 'styled-components';
import { FlexBox } from '../components/Styled';

const HeaderInfo = styled.div`
  padding: 5px;
  width: 100vw;
  background: #000;
  font-family: 'Nanum Pen Script';
  font-size: 1rem;
  text-align: center;
  color: #fff;
`;

const Navbar = (): JSX.Element => {
  const info_string: string =
    'Free domestic ground shipping on orders $200. + over.  Order online - Free Pick up in store';
  return (
    <>
      <nav>
        <HeaderInfo>{info_string}</HeaderInfo>
        <FlexBox flexDirection="row"></FlexBox>
      </nav>
    </>
  );
};

export default Navbar;
