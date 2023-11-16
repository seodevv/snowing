import React, { useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Container } from '../../components/Styled';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/slice';
import { MYMENUS } from '../../navbar/Navbar';
import MyProfile from './MyProfile';
import MyOrder from './MyOrder';
import MyAddresses from './MyAddresses';
import MyWallets from './MyWallets';
import MyWishList from './MyWishList';
import MyAccount from './MyAccount';

const MyBox = styled(Container)`
  margin-top: 125px;
  animation: fade-in 0.5s ease-in;
`;

const Inner = styled(Box)`
  margin: 25px auto 0 auto;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  width: 90%;
  max-width: 980px;
`;

const MyMenu = styled(Box)`
  padding: 0 15px 15px 15px;
  flex: 2.5;
  animation: slide-left-in 0.3s ease-in;
  overflow-x: hidden;

  .content {
    padding: 25px;
    width: 100%;
    border: 1px solid #777;

    .title {
      font-size: 1.7rem;
      letter-spacing: 0.5px;
    }

    .desc {
      margin-top: 25px;
    }
  }
`;

const OutletBox = styled(Box)`
  margin-top: 25px;
  border-top: 2px solid #999;
  border-bottom: 2px solid #999;
`;

const My = () => {
  const navigator = useNavigate();
  const { param1 } = useParams();

  const user = useSelector(selectUser);

  const [menu, setMenu] = useState('');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (param1) {
      setMenu(param1);
    }
  }, [param1]);

  useLayoutEffect(() => {
    if (!user) navigator('/');
  }, [user]);

  return (
    <>
      <MyBox>
        <Inner>
          <MyProfile menu={menu} />
          <MyMenu key={menu}>
            <div className="content">
              <div className="title">
                <span>{MYMENUS.find((m) => m.url === menu)?.name}</span>
              </div>
              <div className="desc">
                <span>{MYMENUS.find((m) => m.url === menu)?.desc}</span>
              </div>
              <OutletBox>
                {menu === 'order' && <MyOrder />}
                {menu === 'address' && <MyAddresses />}
                {menu === 'wallet' && <MyWallets />}
                {menu === 'wishlist' && <MyWishList />}
                {menu === 'account' && <MyAccount />}
              </OutletBox>
            </div>
          </MyMenu>
        </Inner>
      </MyBox>
    </>
  );
};

export default My;
