import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, FlexBox } from '../../components/Styled';
import { WishList, useGetWishListQuery } from '../../app/apiSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/slice';
import MyEmpty from './MyEmpty';
import { useNavigate } from 'react-router-dom';
import WishItem from './WishItem';
import Spinner from '../../components/Spinner';

const MyWishListBox = styled(Box)`
  position: relative;
  width: 100%;
  max-height: 800px;
  animation: fade-in 0.3s ease-in;
  overflow-y: scroll;
`;

const MyWishList = () => {
  const navigator = useNavigate();
  const user = useSelector(selectUser);

  const [wishList, setWishList] = useState<WishList[]>([]);

  const {
    data: getWishList,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetWishListQuery(user ? user.id : -1, {
    skip: !user,
  });

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      setWishList(getWishList.data);
    }
  }, [isSuccess, isFetching]);

  return (
    <>
      <MyWishListBox>
        {(isLoading || isFetching) && (
          <FlexBox
            posit="absolute"
            top="0"
            left="0"
            zIndex={1}
            wid="100%"
            hei="100%"
            bg="rgba(0,0,0,0.75)"
          >
            <Spinner color="#fff" size="2xl" />
          </FlexBox>
        )}
        {wishList.length === 0 && (
          <MyEmpty
            text="Wishlist"
            hei="500px"
            element={
              <Button
                ma="25px 0"
                ftSize="1.3rem"
                color="#ff5d12"
                textDecoration="underline"
                onClick={() => navigator('/shop')}
              >
                Go Shop
              </Button>
            }
          />
        )}
        {wishList.length !== 0 && (
          <FlexBox
            flexWrap="wrap"
            flexJustCon="flex-start"
            flexAlignItem="space-between"
            wid="100%"
          >
            {wishList.map((w) => (
              <WishItem key={w.id} item={w} wid="50%" minWid="250px" />
            ))}
          </FlexBox>
        )}
      </MyWishListBox>
    </>
  );
};

export default MyWishList;
