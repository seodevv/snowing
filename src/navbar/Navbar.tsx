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
import { resetFilter, selectUser, showCart, showSignup } from '../app/slice';
import Profile from '../components/Profile';
import { usePostLogoutMutation } from '../app/apiSlice';
import { useNavigate } from 'react-router-dom';
import BrandsMenu from '../pages/brands/BrandsMenu';
import Menu from '../components/Menu';

const HeaderInfo = styled.div`
  padding: 5px;
  width: 100vw;
  height: 30px;
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
    width: 160px;
    background: #fff;
    font-size: 1rem;
    font-weight: 100;
    list-style: none;
    box-shadow: 5px 5px 10px #000;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s visibility ease-in;
    transition: 0.3s opacity ease-in;

    li {
      margin: 0;
      margin-left: 5px;
      padding: 6px 12px;

      &:last-of-type {
        margin-top: 10px;
        padding: 12px;
        border-top: 1px solid #000;
      }

      &:hover {
        border-left: 2px solid #000;
        border-right: 2px solid #000;
      }
    }
  }

  .my.visible {
    visibility: visible;
    opacity: 1;
  }
`;

export const MAIN: string = 'snowing';
export const INFO: string =
  'Free domestic ground shipping on orders \\50,000. + over.  Order online - Free Pick up in store';
export const MENUS: string[] = [
  'SHOP',
  'NEW',
  'BRANDS',
  'CLOTHING',
  'ACCESSORIES',
  'CONTACT',
];
export const MYMENUS: { name: string; url: string; desc: string }[] = [
  {
    name: 'My Orders',
    url: 'order',
    desc: '주문 내역을 보시거나 최근 주문 상태를 확인하세요.',
  },
  {
    name: 'My Addresses',
    url: 'address',
    desc: '자주 사용하는 주소를 추가하고 관리하세요.',
  },
  {
    name: 'My Wallets',
    url: 'wallet',
    desc: '더 빠른 결제를 위해 신용카드 및 직불카드 정보를 저장하세요.',
  },
  {
    name: 'My Wishlist',
    url: 'wishlist',
    desc: '위시리스트에 저장한 제품 보고 장바구니에 추가하세요.',
  },
  {
    name: 'My Account',
    url: 'account',
    desc: '아래에서 개인 정보를 보고 편집하세요.',
  },
  { name: 'Logout', url: 'logout', desc: '' },
];

const Navbar = (): JSX.Element => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [myMenu, setMyMenu] = useState(false);
  const onClickMyMenu = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setMyMenu((prev) => !prev);
  };

  const [hover, setHover] = useState('idle');
  const onMouseOverMenu = (menu: string) => setHover(menu);

  const [postLogout] = usePostLogoutMutation();
  const onClickLogout = async () => {
    try {
      await postLogout();
      setMyMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

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
        <BrandsMenu active={hover === 'BRANDS'} setActive={setHover} />
        <Menu
          menu="CLOTHING"
          active={hover === 'CLOTHING'}
          setActive={setHover}
        />
        <Menu
          menu="ACCESSORIES"
          active={hover === 'ACCESSORIES'}
          setActive={setHover}
        />
        <HeaderInfo>{INFO}</HeaderInfo>
        <FlexBox
          ma="0 15px"
          pa="15px"
          flexDir="row"
          flexWrap="nowrap"
          flexJustCon="center"
          flexAlignItem="center"
          hei="70px"
          bg="#fff"
        >
          <MainLogo onClick={() => navigator('/')}>
            {MAIN.replace(/^[a-z]/, (item) => item.toLocaleUpperCase())}
          </MainLogo>
          <Menus flexGrow={1}>
            {MENUS.map((menu) => (
              <span
                key={menu}
                onClick={() => {
                  navigator(`/${menu.toLowerCase()}`);
                  setHover('idle');
                  dispatch(resetFilter());
                }}
                onMouseOver={() => onMouseOverMenu(menu)}
              >
                {menu}
              </span>
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
                  <ul className={`my ${myMenu && 'visible'}`}>
                    {MYMENUS.map((menu, i) => {
                      if (menu.name.toLowerCase() === 'logout') {
                        return (
                          <li key={menu.name} onClick={() => onClickLogout()}>
                            {menu.name}
                          </li>
                        );
                      }
                      return (
                        <li
                          key={menu.name}
                          onClick={() => {
                            navigator(`/my/${menu.url}`);
                            setMyMenu(false);
                          }}
                        >
                          {menu.name}
                        </li>
                      );
                    })}
                  </ul>
                </MenuBox>
              </>
            )}
            <FontAwesomeIcon
              icon={faCartShopping}
              size="xl"
              onClick={() => {
                dispatch(showCart());
              }}
            />
          </Icons>
        </FlexBox>
      </Container>
    </>
  );
};

export default Navbar;
