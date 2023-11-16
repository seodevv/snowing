import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box } from '../../components/Styled';
import Input from '../../components/Input';
import { onFocusElement } from './AddressForm';

interface CreditCardFormProps {
  setState: Dispatch<SetStateAction<string[]>>;
  isError: number;
  setIsError: Dispatch<SetStateAction<number>>;
}

const CreditCardForm = ({
  setState,
  isError,
  setIsError,
}: CreditCardFormProps) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const thirdRef = useRef<HTMLInputElement>(null);
  const fourthRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (first.length === 4 && secondRef.current) secondRef.current.focus();
  }, [first]);

  useEffect(() => {
    if (second.length === 4 && thirdRef.current) thirdRef.current.focus();
  }, [second]);

  useEffect(() => {
    if (third.length === 4 && fourthRef.current) fourthRef.current.focus();
  }, [third]);

  useEffect(() => {
    setState([first, second, third, fourth]);
  }, [first, second, third, fourth]);

  useEffect(() => {
    if (isError !== -1) {
      switch (isError) {
        case 0:
          onFocusElement(firstRef);
          break;
        case 1:
          onFocusElement(secondRef);
          break;
        case 2:
          onFocusElement(thirdRef);
          break;
        case 3:
          onFocusElement(fourthRef);
          break;
      }
      setIsError(-1);
    }
  }, [isError]);

  return (
    <>
      <Box mt="-10px" wid="100%">
        <Input
          ref={firstRef}
          placeHolder="XXXX"
          state={first}
          setState={setFirst}
          regex={/^[0-9]+$/}
          limit={4}
          require
          mr="5px"
          dis="inline-block"
          wid="calc(25% - 3.75px)"
          bg="#000"
          br="none"
          color="#fff"
          letterSpacing="3px"
        />
        <Input
          ref={secondRef}
          placeHolder="XXXX"
          state={second}
          setState={setSecond}
          regex={/^[0-9]+$/}
          limit={4}
          require
          mr="5px"
          dis="inline-block"
          wid="calc(25% - 3.75px)"
          bg="#000"
          br="none"
          color="#fff"
          letterSpacing="3px"
        />
        <Input
          ref={thirdRef}
          placeHolder="XXXX"
          state={third}
          setState={setThird}
          regex={/^[0-9]+$/}
          limit={4}
          require
          mr="5px"
          dis="inline-block"
          wid="calc(25% - 3.75px)"
          bg="#000"
          br="none"
          color="#fff"
          letterSpacing="3px"
        />
        <Input
          ref={fourthRef}
          placeHolder="XXXX"
          state={fourth}
          setState={setFourth}
          regex={/^[0-9]+$/}
          limit={4}
          require
          dis="inline-block"
          wid="calc(25% - 3.75px)"
          bg="#000"
          br="none"
          color="#fff"
          letterSpacing="3px"
        />
      </Box>
    </>
  );
};

export default CreditCardForm;
