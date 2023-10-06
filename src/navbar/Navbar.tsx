import React from 'react';
import styled from 'styled-components';
import { Box, Container, FlexBox } from '../components/Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

const HeaderInfo = styled.div`
  padding: 5px;
  width: 100vw;
  background: #000;
  font-family: 'Nanum Pen Script';
  font-size: 1rem;
  text-align: center;
  color: #fff;
`;

const MainLogo = styled.span`
  font-family: 'Rubik Moonrocks';
  font-size: 2rem;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
`;

const Menus = styled(Box)`
  font-size: 0.95rem;
  text-align: center;
  cursor: pointer;
  user-select: none;

  span {
    letter-spacing: 1px;
    transition: 0.1s all ease-in;

    &:hover {
      font-size: 1.05rem;
      text-shadow: 2px 3px 7px white, 0 10px 1px #a1a1a1;
    }

    &:active {
      font-weight: bold;
    }
  }

  span + span {
    margin-left: 1rem;
  }
`;

const Icons = styled.div`
  cursor: pointer;

  svg + svg {
    margin-left: 50px;
  }
`;

const Navbar = (): JSX.Element => {
  const main_String: string = 'snowing';
  const info_string: string =
    'Free domestic ground shipping on orders $200. + over.  Order online - Free Pick up in store';
  const menus_array: string[] = [
    'SHOP',
    'NEW',
    'BRANDS',
    'CLOTHING',
    'FOOTWEAR',
    'ACCESSORIES',
    'CONTACT',
  ];
  return (
    <>
      <Container
        posit="fixed"
        top="0"
        left="0"
        bg="#fff"
        wid="100%"
        zIndex={9999}
      >
        <HeaderInfo>{info_string}</HeaderInfo>
        <FlexBox
          ma="0 15px"
          pa="15px"
          flexDir="row"
          flexWrap="nowrap"
          flexJustCon="center"
          flexAlignItem="center"
        >
          <MainLogo>
            {main_String.replace(/^[a-z]/, (item) => item.toLocaleUpperCase())}
          </MainLogo>
          <Menus flexGrow={1}>
            {menus_array.map((menu) => (
              <span key={menu}>{menu}</span>
            ))}
          </Menus>
          <Icons>
            <FontAwesomeIcon icon={faCircleUser} size="xl" />
            <FontAwesomeIcon icon={faCartShopping} size="xl" />
          </Icons>
        </FlexBox>
      </Container>
    </>
  );
};

export default Navbar;
