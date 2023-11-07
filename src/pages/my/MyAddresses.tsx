import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, FlexBox } from '../../components/Styled';
import MyEmpty from './MyEmpty';
import { bodyScrollDisableHandler, selectUser } from '../../app/slice';
import {
  Addresses,
  useGetAddressesQuery,
  useGetCountryQuery,
  useGetProvinceQuery,
} from '../../app/apiSlice';
import { useSelector } from 'react-redux';
import Address from './Address';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddressForm from './AddressForm';

const MyAddressesBox = styled(Box)`
  width: 100%;
  animation: fade-in 0.3s ease-in;

  .button {
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

  const user = useSelector(selectUser);
  const [addresses, setAddresses] = useState<Addresses[]>([]);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(-1);

  const config = {
    skip: !user,
  };
  const {
    data: getAddreses,
    isSuccess,
    isFetching,
    isError,
  } = useGetAddressesQuery(user ? user.id : -1, config);

  useLayoutEffect(() => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const closeListner = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setAdd(false);
        setEdit(false);
      }
    };
    if (!body) return;
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
        {addresses.length === 0 && (
          <MyEmpty
            text="addresses"
            hei="500px"
            element={
              <button className="button" onClick={() => setAdd(true)}>
                Add New Address
              </button>
            }
          />
        )}
        {addresses.length !== 0 && (
          <FlexBox mb="15px" flexWrap="wrap">
            <Box
              ma="10px"
              wid="100%"
              color="#0251ac"
              className="add-button"
              onClick={() => setAdd(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>Add</span>
            </Box>
            {addresses.map((a) => (
              <Address
                key={a.id}
                item={a}
                setEdit={setEdit}
                setEditId={setEditId}
              />
            ))}
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
