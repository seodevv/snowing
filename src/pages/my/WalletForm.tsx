import React, {
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FormBox, LoadingBox, MyFixedBox, onFocusElement } from './AddressForm';
import styled from 'styled-components';
import { Box, Button, P, Span } from '../../components/Styled';
import Input from '../../components/Input';
import CreditCardForm from './CreditCardForm';
import { useSelector } from 'react-redux';
import {
  bodyScrollDisableHandler,
  selectSecret,
  selectUser,
} from '../../app/slice';
import CryptoJS from 'crypto-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { usePostWalletsMutation } from '../../app/apiSlice';
import Spinner from '../../components/Spinner';
import {
  faCcAmex,
  faCcJcb,
  faCcMastercard,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons';

const CardBox = styled(Box)`
  margin-top: 5px;
  padding: 15px;
  background: #777;

  span {
    margin-left: 5px;
    letter-spacing: 1px;
  }

  .error {
    outline: 2px solid #f00 !important;
    animation: error 0.3s ease !important;
    transition: none !important;
  }

  .error + .error-box::after {
    content: '';
  }
`;

const DefaultBox = styled(Box)`
  input[type='checkbox'] {
    scale: 1.3;
    transition: 0.3s all ease-in;
    cursor: pointer;
  }

  input[type='checkbox'] + label {
    margin-left: 10px;
    font-size: 0.8rem;
    cursor: pointer;
  }
`;

const CompanyBox = styled(Box)`
  margin: 10px 5px 10px 0;
  border: 2px solid #000;
  text-align: center;

  input[type='radio'] {
    display: none;
  }

  input[type='radio'] + label {
    color: #fff;
  }

  input[type='radio']:checked + label {
    background: #fff;
    color: #000;
  }

  label {
    display: inline-block;
    padding: 3px 6px;
    font-weight: bold;
    color: #000;
    text-decoration: underline;
    text-underline-offset: 5px;
    letter-spacing: 1px;
    transition: 0.1s all ease-in;
  }

  .master {
    letter-spacing: -2px;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const encryptData = (data: any, secret: string): string | undefined => {
  if (!data || !secret) return;
  return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
};

export const CARD_COMPANY = [
  { name: 'visa', icon: faCcVisa },
  { name: 'master', icon: faCcMastercard },
  { name: 'amex', icon: faCcAmex },
  { name: 'jcb', icon: faCcJcb },
];

interface WalletFormProps {
  setState: Dispatch<SetStateAction<boolean>>;
}

const WalletForm = ({ setState }: WalletFormProps) => {
  const user = useSelector(selectUser);
  const secret = useSelector(selectSecret);

  const [isDefault, setIsDefault] = useState(false);
  const [company, setCompany] = useState(0);
  const [cardNumber, setCardNumber] = useState<string[]>([]);
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [isError, setIsError] = useState<number>(-1);
  const expirationRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);
  const cardHolderNameRef = useRef<HTMLInputElement>(null);

  const [postWallets, { isLoading }] = usePostWalletsMutation();
  const onSubmitWallet = async () => {
    if (!user) return;

    const cardNumberCheck = cardNumber.some((num, i) => {
      const isCorrect = !/^[0-9]{4}$/.test(num);
      if (isCorrect) setIsError(i);
      return isCorrect;
    });
    if (cardNumberCheck) return;

    if (!/^(01|02|03|04|05|06|07|08|09|10|11|12)\/[0-9]{2}/.test(expiration)) {
      return onFocusElement(expirationRef);
    }

    if (!/^[0-9]{3}$/.test(cvc)) {
      return onFocusElement(cvcRef);
    }

    if (!/^[a-zA-Z\s]{1,32}$/.test(cardHolderName)) {
      return onFocusElement(cardHolderNameRef);
    }

    const data = {
      card_type: CARD_COMPANY[company].name,
      card_number: cardNumber.toString(),
      expiration,
      cvc,
      cardHolderName,
    };
    const encData = encryptData(data, secret);
    if (!encData) return;

    try {
      await postWallets({
        type: 'add',
        userId: user.id,
        isDefault,
        card_data: encData,
      });
      setState(false);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    const closeListner = (e: KeyboardEvent) => {
      if (e.keyCode === 27) setState(false);
    };
    window.addEventListener('keydown', closeListner);
    bodyScrollDisableHandler(true);
    return () => {
      window.removeEventListener('keydown', closeListner);
      bodyScrollDisableHandler(false);
    };
  }, []);

  return (
    <>
      <MyFixedBox
        bg="rgba(0,0,0,0.7)"
        onClick={(e) => {
          if (e.currentTarget === e.target) setState(false);
        }}
      >
        <FormBox wid="90%" maxWid="540px">
          {isLoading && (
            <LoadingBox bg="rgba(0,0,0,0.75)">
              <Spinner color="#fff" size="2xl" />
            </LoadingBox>
          )}
          <div className="header">
            <span>Add new card</span>
          </div>
          <Box>
            {CARD_COMPANY.map((c, i) => (
              <CompanyBox key={c.name} dis="inline-block">
                <input
                  type="radio"
                  name="company"
                  id={c.name}
                  checked={company === i}
                  onChange={() => setCompany(i)}
                />
                <label htmlFor={c.name}>
                  <FontAwesomeIcon icon={c.icon} size="2xl" />
                </label>
              </CompanyBox>
            ))}
          </Box>
          <CardBox>
            <Box>
              <Span>Card Number</Span>
              <CreditCardForm
                setState={setCardNumber}
                isError={isError}
                setIsError={setIsError}
              />
            </Box>
            <Box mr="10px" dis="inline-block" wid="calc(50% - 7.5px)">
              <Span>Expiration date</Span>
              <Input
                ref={expirationRef}
                label="MM / YY"
                state={expiration}
                setState={setExpiration}
                regex={/^[0-9\/]+$/}
                limit={5}
                require
                type="expire"
                mt="5px"
                bg="#000"
                br="none"
                color="#fff"
                letterSpacing="5px"
              />
            </Box>
            <Box dis="inline-block" wid="calc(50% - 7.5px)">
              <Span>CVV/CVC</Span>
              <Input
                ref={cvcRef}
                placeHolder="XXX"
                state={cvc}
                setState={setCvc}
                regex={/^[0-9]+$/}
                limit={3}
                require
                password
                mt="5px"
                bg="#000"
                br="none"
                color="#fff"
                letterSpacing="5px"
              />
            </Box>
            <Box>
              <Span>Cardholder name</Span>
              <Input
                ref={cardHolderNameRef}
                placeHolder="Cardholder name"
                state={cardHolderName}
                setState={setCardHolderName}
                regex={/^[a-zA-Z\s]+$/}
                limit={32}
                require
                mt="5px"
                bg="#000"
                br="none"
                color="#fff"
                letterSpacing="1px"
              />
            </Box>
          </CardBox>
          <DefaultBox mt="10px">
            <input
              type="checkbox"
              id="default"
              checked={isDefault}
              onChange={(e) => {
                // if (first || edit?.isDefault) return;
                setIsDefault(e.target.checked);
              }}
            />
            <label htmlFor="default">
              이 카드를 기본 결제 수단으로 설정합니다.
            </label>
          </DefaultBox>
          <Box mt="25px">
            <Button
              pa="12px 24px"
              wid="100%"
              color="#fff"
              bd="1px solid #777"
              onClick={() => onSubmitWallet()}
            >
              Add card
            </Button>
          </Box>
          <Box pa="5px" posit="absolute" top="15px" right="15px">
            <Button onClick={() => setState(false)}>
              <FontAwesomeIcon icon={faXmark} color="#fff" size="xl" />
            </Button>
          </Box>
        </FormBox>
      </MyFixedBox>
    </>
  );
};

export default WalletForm;
