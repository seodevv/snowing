import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Container, FlexBox } from '../components/Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faChevronDown,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, showSignup } from '../app/slice';
import Profile from '../components/Profile';
import { usePostLogoutMutation } from '../app/apiSlice';

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

  div {
    display: inline-block;
    vertical-align: middle;
  }
`;

const MenuBox = styled(Box)`
  position: relative;

  svg {
    margin-left: 10px;
    margin-right: 40px;
  }

  .my {
    margin: 0;
    padding: 10px;
    position: absolute;
    top: 45px;
    left: -100px;
    width: 150px;
    background: #fff;
    font-size: 1rem;
    font-weight: 100;
    list-style: none;
    box-shadow: 5px 5px 10px #000;
    animation-name: fade-in;
    animation-duration: 0.3s;
    animation-timing-function: ease-in;

    li {
      margin: 0;
      margin-left: 5px;
      padding: 6px 12px;

      &:last-of-type {
        margin-top: 10px;
        padding: 12px;
        border-top: 1px solid #000;
      }
    }
  }
`;

const Navbar = (): JSX.Element => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [myMenu, setMyMenu] = useState(false);
  const onClickMyMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setMyMenu((prev) => !prev);
  };

  const [postLogout] = usePostLogoutMutation();
  const onClickLogout = async () => {
    try {
      await postLogout();
      setMyMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  const main: string = 'snowing';
  const info: string =
    'Free domestic ground shipping on orders $200. + over.  Order online - Free Pick up in store';
  const menus: string[] = [
    'SHOP',
    'NEW',
    'BRANDS',
    'CLOTHING',
    'FOOTWEAR',
    'ACCESSORIES',
    'CONTACT',
  ];
  const myMenus: string[] = [
    'My Orders',
    'My Addresses',
    'My Wallets',
    'My Subscriptions',
    'My Wishlist',
    'My Account',
    'Logout',
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
        <HeaderInfo>{info}</HeaderInfo>
        <FlexBox
          ma="0 15px"
          pa="15px"
          flexDir="row"
          flexWrap="nowrap"
          flexJustCon="center"
          flexAlignItem="center"
        >
          <MainLogo>
            {main.replace(/^[a-z]/, (item) => item.toLocaleUpperCase())}
          </MainLogo>
          <Menus flexGrow={1}>
            {menus.map((menu) => (
              <span key={menu}>{menu}</span>
            ))}
          </Menus>
          <Icons>
            {!user ? (
              <FontAwesomeIcon
                icon={faCircleUser}
                size="xl"
                onClick={() => {
                  dispatch(showSignup());
                }}
              />
            ) : (
              <>
                <MenuBox onClick={(e) => onClickMyMenu(e)}>
                  <Profile
                    src={user.picture}
                    size="30px"
                    className="profile"
                    onClick={(e) => onClickMyMenu(e)}
                  />
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="lg"
                    onClick={(e) => onClickMyMenu(e)}
                  />
                  {myMenu && (
                    <ul className="my">
                      {myMenus.map((menu, i) => {
                        if (menu.toLowerCase() === 'logout') {
                          return (
                            <li key={i} onClick={() => onClickLogout()}>
                              {menu}
                            </li>
                          );
                        }
                        return <li key={i}>{menu}</li>;
                      })}
                    </ul>
                  )}
                </MenuBox>
              </>
            )}
            <FontAwesomeIcon icon={faCartShopping} size="xl" />
          </Icons>
        </FlexBox>
      </Container>
    </>
  );
};

export default Navbar;
