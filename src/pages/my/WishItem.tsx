import React from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  FlexColumnBox,
  GlobalProps,
  H4,
  P,
} from '../../components/Styled';
import { WishList, usePostWishMutation } from '../../app/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, showModal, showProductPopup } from '../../app/slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const WishItemBox = styled(FlexColumnBox)`
  position: relative;
  justify-content: space-between;

  .image-box {
    .image,
    .hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      visibility: visible;
      opacity: 1;
      transition: 0.3s all ease-in;
    }

    .hover {
      visibility: hidden;
      opacity: 0;
    }
  }
  .image-box:hover {
    .image {
      visibility: hidden;
      opacity: 0;
    }

    .hover {
      visibility: visible;
      opacity: 1;
    }
  }
`;

interface WishItemProps extends GlobalProps {
  item: WishList;
}

const WishItem = ({
  item,
  pa = '15px',
  wid = '100%',
  minWid,
  hei,
  minHei = '450px',
}: WishItemProps) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [postWish] = usePostWishMutation();

  const image_array = item.image.split('/');

  return (
    <>
      <WishItemBox pa={pa} wid={wid} minWid={minWid} hei={hei} minHei={minHei}>
        <Button
          posit="absolute"
          top="15px"
          right="15px"
          zIndex={1}
          onClick={async () => {
            if (!user) return;
            dispatch(
              showModal({
                message: '해당 위시리스트 상품을 삭제하시겠습니까?',
                onSubmit: async (userId, listId) => {
                  try {
                    await postWish({ userId, listId });
                  } catch (error) {}
                },
                args: [user.id, item.id.toString()],
              })
            );
          }}
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Button>
        <Box
          className="image-box"
          posit="relative"
          wid="100%"
          aspectRatio="1 / 1"
          overflow="hidden"
          cursor="pointer"
          onClick={() =>
            dispatch(showProductPopup({ id: item.id, wish: true }))
          }
        >
          <img
            className="image"
            src={`${process.env.REACT_APP_SERVER_URL}/files/${image_array[0]}`}
            alt={image_array[0]}
          />
          <img
            className="hover"
            src={`${process.env.REACT_APP_SERVER_URL}/files/${image_array[1]}`}
            alt={image_array[1]}
          />
        </Box>
        <Box mt="15px" flexGrow={1}>
          <H4 lineHeight="1.5rem">{item.name}</H4>
          <P mt="5px" ftWeight="bold" color="#aaa">
            \{item.price.toLocaleString()}
          </P>
        </Box>
        <Box mt="15px" wid="100%">
          <Button
            pa="12px"
            wid="100%"
            bg="#000"
            color="#fff"
            onClick={() =>
              dispatch(showProductPopup({ id: item.id, wish: true }))
            }
          >
            Add to Cart
          </Button>
        </Box>
      </WishItemBox>
    </>
  );
};

export default WishItem;
