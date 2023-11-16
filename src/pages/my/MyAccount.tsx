import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  FlexBox,
  H3,
  Input,
  P,
  Span,
} from '../../components/Styled';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/slice';
import { usePostAccountMutation } from '../../app/apiSlice';
import { phone_regex } from '../contact/ContactForm';
import Spinner from '../../components/Spinner';
import { onFocusElement } from './AddressForm';

const MyAccountBox = styled(Box)`
  position: relative;
  width: 100%;
  animation: fade-in 0.3s ease-in;

  .error {
    border: none;
    outline: 2px solid #f00 !important;
    animation: error 0.3s ease !important;
    transition: none !important;
  }
`;

const AccountInput = styled(Input)`
  margin-top: 10px;
  padding: 12px;
  width: 100%;
  border: none;
  border-bottom: 3px solid #777;
  border-radius: unset;
  outline: none;
`;

const MyAccount = () => {
  const user = useSelector(selectUser);
  const [postAccount, { isLoading }] = usePostAccountMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const canSave =
    user &&
    (user.nick.split(' ')[0] !== firstName ||
      user.nick.split(' ')[1] !== lastName ||
      user.email !== email ||
      (user.phone ? user.phone : '') !== phone);

  type OnChangeEvent = ChangeEvent<HTMLInputElement> & {
    nativeEvent: { inputType: string };
  };
  const onChangeInputState = (
    e: OnChangeEvent,
    setState: Dispatch<SetStateAction<string>>,
    type?: 'phone'
  ) => {
    const value = e.target.value;
    if (e.target.classList.contains('error')) {
      e.target.classList.remove('error');
    }

    if (
      type === 'phone' &&
      e.nativeEvent.inputType !== 'deleteContentBackward' &&
      (/^[0-9]{3}$/.test(value) || /^[0-9]{3}-[0-9]{4}$/.test(value))
    ) {
      return setState(value + '-');
    }
    setState(value);
  };

  const resetInput = () => {
    if (user) {
      const nick_array = user.nick.split(' ');
      setEmail(user.email);
      setFirstName(nick_array[0]);
      setLastName(nick_array[1] ? nick_array[1] : '');
      setPhone(user.phone ? user.phone : '');
    }
  };

  const updateAccount = async () => {
    if (!user) return;
    if (firstName === '') return onFocusElement(firstNameRef);
    if (phone !== '' && !phone_regex.test(phone)) {
      return onFocusElement(phoneRef);
    }

    try {
      await postAccount({
        id: user.id,
        nick: `${firstName} ${lastName}`,
        email,
        phone,
      });
    } catch (error) {}
  };

  useLayoutEffect(() => {
    resetInput();
  }, [user]);

  return (
    <>
      <MyAccountBox pa="15px">
        {isLoading && (
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
        <Box ma="15px 0" lineHeight="2rem" letterSpacing="1px">
          <H3 mt="15px">Account</H3>
          <P ftSize="1.1rem" color="#777">
            개인 정보를 확인하고 업데이트하세요.
          </P>
        </Box>
        <Box ma="25px 0" color="#777" lineHeight="1.7rem">
          <P>Login Email:</P>
          <P
            ftWeight="bold"
            textDecoration="underline"
            textUnderlineOffset="5px"
          >
            {email}
          </P>
          <P color="#aaa">귀하의 로그인 이메일은 변경할 수 없습니다.</P>
        </Box>
        <Box>
          <Box dis="inline-block" wid="calc(50% - 25px)">
            <Span>First Name</Span>
            <AccountInput
              ref={firstNameRef}
              value={firstName}
              onChange={(e: OnChangeEvent) =>
                onChangeInputState(e, setFirstName)
              }
              spellCheck={false}
            />
          </Box>
          <Box ml="50px" dis="inline-block" wid="calc(50% - 25px)">
            <Span>Last Name</Span>
            <AccountInput
              ref={lastNameRef}
              value={lastName}
              onChange={(e: OnChangeEvent) =>
                onChangeInputState(e, setLastName)
              }
              spellCheck={false}
            />
          </Box>
        </Box>
        <Box ma="15px 0">
          <Box dis="inline-block" wid="calc(50% - 25px)">
            <Span>Email</Span>
            <AccountInput
              value={email}
              onChange={(e: OnChangeEvent) => onChangeInputState(e, setEmail)}
              spellCheck={false}
              disabled
            />
          </Box>
          <Box ml="50px" dis="inline-block" wid="calc(50% - 25px)">
            <Span>Phone</Span>
            <AccountInput
              ref={phoneRef}
              value={phone}
              onChange={(e: OnChangeEvent) =>
                onChangeInputState(e, setPhone, 'phone')
              }
              spellCheck={false}
            />
          </Box>
        </Box>
        <Box mt="30px" textAlign="right">
          <Button
            wid="100px"
            bd="2px solid #777"
            color="#777"
            disabled={!canSave}
            onClick={() => resetInput()}
          >
            취소
          </Button>
          <Button
            wid="100px"
            bd="2px solid  #027a12"
            color="#027a12"
            disabled={!canSave}
            onClick={() => updateAccount()}
          >
            업데이트
          </Button>
        </Box>
      </MyAccountBox>
    </>
  );
};

export default MyAccount;
