import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, FlexBox, Span } from '../../components/Styled';
import MyEmpty from './MyEmpty';
import { useDispatch, useSelector } from 'react-redux';
import { selectSecret, selectUser, showModal } from '../../app/slice';
import WalletForm from './WalletForm';
import {
  useDeleteWalletsMutation,
  useGetWalletsQuery,
} from '../../app/apiSlice';
import CryptoJS from 'crypto-js';
import CreditCard from './CreditCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faCreditCard as faCreditCardA,
  faSquareCheck,
  faSquareMinus,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { faCreditCard as faCreditCardB } from '@fortawesome/free-regular-svg-icons';
import Spinner from '../../components/Spinner';

const MyWalletsBox = styled(Box)`
  width: 100%;
  animation: fade-in 0.3s ease-in;
  overflow: hidden;
`;

const WalletsSlider = styled(FlexBox)`
  width: 100%;
  position: relative;
  justify-content: flex-start;
  overflow: hidden;
`;

export interface Wallets {
  id: number;
  isDefault: boolean;
  card_type: 'visa' | 'master' | 'amex' | 'jcb';
  card_number: string;
  expiration: string;
  cvc: string;
  cardHolderName: string;
}

const MyWallets = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const secret = useSelector(selectSecret);

  const [wallets, setWallets] = useState<Wallets[]>([]);
  const [add, setAdd] = useState(false);
  const [current, setCurrent] = useState(0);

  const [deleteWallets] = useDeleteWalletsMutation();

  const currentHandler = (type: 'left' | 'right') => {
    if (type === 'left') {
      if (current === 0) return;
      else return setCurrent((prev) => prev - 1);
    }
    if (current === wallets.length - 1) return;
    else setCurrent((prev) => prev + 1);
  };

  const {
    data: getWallets,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetWalletsQuery(user ? user.id : -1, {
    skip: !user,
  });

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      setWallets(
        getWallets.data.map((w) => {
          const data: Omit<Wallets, 'id' | 'isDefault'> = JSON.parse(
            CryptoJS.AES.decrypt(w.card_data, secret).toString(
              CryptoJS.enc.Utf8
            )
          );
          return {
            id: w.id,
            isDefault: w.isDefault,
            ...data,
          };
        })
      );
    }
  }, [isSuccess, isFetching]);

  return (
    <>
      <MyWalletsBox>
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
        {wallets.length === 0 && (
          <MyEmpty
            text="Cards"
            hei="500px"
            element={
              <Button
                ma="25px 0"
                ftSize="1.3rem"
                color="#ff5d12"
                textDecoration="underline"
                onClick={() => setAdd(true)}
              >
                Add new card
              </Button>
            }
          />
        )}
        <WalletsSlider hei="500px" bg="#eee">
          {wallets.map((w) => (
            <FlexBox
              key={w.id}
              minWid="100%"
              hei="100%"
              transform={`translateX(${-100 * current}%)`}
              transition="0.3s all ease-in"
            >
              <CreditCard key={w.id} item={w} />
            </FlexBox>
          ))}
          <Box posit="absolute" top="15px" left="15px">
            <Button pa="0" onClick={() => setAdd(true)}>
              <FontAwesomeIcon icon={faSquarePlus} size="2xl" />
            </Button>
            <Button
              pa="0"
              onClick={() =>
                dispatch(
                  showModal({
                    message: '이 카드 정보를 삭제하시겠습니까?',
                    onSubmit: (id) => {
                      try {
                        deleteWallets(id);
                      } catch (error) {}
                    },
                    args: [wallets[current].id],
                  })
                )
              }
            >
              <FontAwesomeIcon icon={faSquareMinus} size="2xl" />
            </Button>
          </Box>
          {wallets.length !== 0 && wallets[current].isDefault && (
            <Box
              posit="absolute"
              top="15px"
              right="15px"
              color="rgb(2, 81, 172)"
            >
              <Span mr="10px" ftWeight="bold" letterSpacing="1px">
                Default
              </Span>
              <FontAwesomeIcon icon={faSquareCheck} size="2xl" />
            </Box>
          )}
          <Box
            posit="absolute"
            left="50%"
            bottom="15px"
            transform="translateX(-50%)"
          >
            <Box mb="15px" textAlign="center">
              {wallets.map((w, i) => (
                <Button
                  key={i}
                  pa="0"
                  color={i === current ? '#0040ca' : '#000'}
                  cursor="pointer"
                  onClick={() => setCurrent(i)}
                >
                  <FontAwesomeIcon
                    icon={i === current ? faCreditCardA : faCreditCardB}
                    size="xl"
                  />
                </Button>
              ))}
            </Box>
            <Box textAlign="center">
              <Button pa="0" disabled={current === 0}>
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  size="xl"
                  onClick={() => currentHandler('left')}
                />
              </Button>
              <Button pa="0" disabled={current === wallets.length - 1}>
                <FontAwesomeIcon
                  icon={faChevronCircleRight}
                  size="xl"
                  onClick={() => currentHandler('right')}
                />
              </Button>
            </Box>
          </Box>
        </WalletsSlider>
        {add && <WalletForm setState={setAdd} />}
      </MyWalletsBox>
    </>
  );
};

export default MyWallets;
