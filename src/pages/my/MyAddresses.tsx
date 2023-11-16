import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, FlexBox } from '../../components/Styled';
import MyEmpty from './MyEmpty';
import {
  bodyScrollDisableHandler,
  selectUser,
  showModal,
} from '../../app/slice';
import {
  Addresses,
  useDeleteAddressMutation,
  useGetAddressesQuery,
  useGetCountryQuery,
  useGetProvinceQuery,
} from '../../app/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Address from './Address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard as faAddressCardA,
  faSquareCaretLeft,
  faSquareCaretRight,
  faSquareMinus,
  faSquarePen,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { faAddressCard as faAddressCardB } from '@fortawesome/free-regular-svg-icons';
import AddressForm from './AddressForm';
import Spinner from '../../components/Spinner';

const MyAddressesBox = styled(Box)`
  position: relative;
  animation: fade-in 0.3s ease-in;

  .new-address {
    margin: 25px auto;
    padding: 15px 50px;
    display: block;
    background: #000;
    border: none;
    font-size: 1.3rem;
    color: #fff;
    transition: 0.1s opacity ease-in;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
      transition: none;
    }
  }

  .add-button {
    transition: 0.1s all ease-in;
    user-select: none;
    cursor: pointer;

    svg {
      margin-right: 5px;
    }

    &:hover {
      opacity: 0.5;
    }

    &:active {
      filter: blur(1px);
      transition: none;
    }
  }
`;

export const COLOR_ARRAY = ['#a00320', '#003c91', '#D1FAF5'];

const MyAddresses = () => {
  useGetCountryQuery();
  useGetProvinceQuery(1);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [addresses, setAddresses] = useState<Addresses[]>([]);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [current, setCurrent] = useState(0);

  const [deleteAddress] = useDeleteAddressMutation();

  const currentHandler = (type: 'left' | 'right' | number) => {
    if (typeof type === 'number') {
      return setCurrent(type);
    }
    if (type === 'left') {
      if (current === 0) return;
      else return setCurrent((prev) => prev - 1);
    }
    if (current === addresses.length - 1) return;
    else setCurrent((prev) => prev + 1);
  };

  const config = {
    skip: !user,
  };
  const {
    data: getAddreses,
    isLoading,
    isSuccess,
    isFetching,
    isError,
  } = useGetAddressesQuery(user ? user.id : -1, config);

  useLayoutEffect(() => {
    const closeListner = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setAdd(false);
        setEdit(false);
      }
    };
    if (add || edit) {
      bodyScrollDisableHandler(true);
      window.addEventListener('keydown', closeListner);
    } else {
      bodyScrollDisableHandler(false);
    }

    return () => {
      window.removeEventListener('keydown', closeListner);
    };
  }, [add, edit]);

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      setAddresses(getAddreses.data);
    }
  }, [isSuccess, isFetching]);

  return (
    <>
      <MyAddressesBox>
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
        {addresses.length === 0 && (
          <MyEmpty
            text="addresses"
            hei="500px"
            element={
              <button className="new-address" onClick={() => setAdd(true)}>
                Add New Address
              </button>
            }
          />
        )}
        {addresses.length !== 0 && (
          <FlexBox
            posit="relative"
            flexJustCon="flex-start"
            flexAlignItem="center"
            wid="100%"
            hei="500px"
            bg="#eee"
            overflow="hidden"
          >
            {addresses.map((a) => (
              <FlexBox
                key={a.id}
                minWid="100%"
                hei="100%"
                transform={`translateX(${-100 * current}%)`}
                transition="0.3s all ease-in"
              >
                <Address key={a.id} item={a} />
              </FlexBox>
            ))}
            <Box posit="absolute" top="15px" left="15px">
              <Button pa="0" color="#0251ac">
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  size="2xl"
                  onClick={() => setAdd(true)}
                />
              </Button>
              <Button pa="0" color="#0251ac">
                <FontAwesomeIcon
                  icon={faSquareMinus}
                  size="2xl"
                  onClick={() =>
                    dispatch(
                      showModal({
                        message: '이 주소를 삭제하시겠습니까?',
                        onSubmit: (id) => {
                          try {
                            deleteAddress(id);
                          } catch (error) {}
                        },
                        args: [addresses[current].id],
                      })
                    )
                  }
                />
              </Button>
            </Box>
            <Box posit="absolute" top="15px" right="15px">
              <Button
                pa="0"
                onClick={() => {
                  setEditId(addresses[current].id);
                  setEdit(true);
                }}
              >
                <FontAwesomeIcon icon={faSquarePen} size="2xl" />
              </Button>
            </Box>
            <Box
              posit="absolute"
              left="50%"
              bottom="15px"
              transform="translateX(-50%)"
            >
              <Box mb="5px" textAlign="center">
                {addresses.map((w, i) => (
                  <Button
                    key={i}
                    pa="0"
                    color={i === current ? '#0040ca' : '#000'}
                    cursor="pointer"
                    onClick={() => currentHandler(i)}
                  >
                    <FontAwesomeIcon
                      icon={i === current ? faAddressCardA : faAddressCardB}
                      size="xl"
                    />
                  </Button>
                ))}
              </Box>
            </Box>
            {current !== 0 && (
              <Button
                pa="0"
                posit="absolute"
                top="50%"
                left="15px"
                bg="#eee"
                transform="translateY(-50%)"
                onClick={() => currentHandler('left')}
              >
                <FontAwesomeIcon icon={faSquareCaretLeft} size="2xl" />
              </Button>
            )}
            {current !== addresses.length - 1 && (
              <Button
                pa="0"
                posit="absolute"
                top="50%"
                right="10px"
                transform="translateY(-50%)"
                bg="#eee"
                onClick={() => currentHandler('right')}
              >
                <FontAwesomeIcon icon={faSquareCaretRight} size="2xl" />
              </Button>
            )}
          </FlexBox>
        )}
        {add && (
          <AddressForm first={addresses.length === 0} setState={setAdd} />
        )}
        {edit && (
          <AddressForm
            edit={addresses.find((v) => v.id === editId)}
            setState={setEdit}
          />
        )}
      </MyAddressesBox>
    </>
  );
};

export default MyAddresses;
