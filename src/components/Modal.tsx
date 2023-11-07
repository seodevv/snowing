import React, { useLayoutEffect } from 'react';
import { FixedBox } from './Feed';
import { Box, Button, H4 } from './Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { closeModal } from '../app/slice';

interface ModalProps {
  message: string;
  onSubmit: (...args: any[]) => any;
  args: any[];
}

const Modal = ({ message, onSubmit, args }: ModalProps) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const closeListner = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        dispatch(closeModal());
      }
    };
    window.addEventListener('keydown', closeListner);
    return () => window.removeEventListener('keydown', closeListner);
  }, []);

  return (
    <>
      <FixedBox
        bg="rgba(0,0,0,0.7)"
        backdropFilter="blur(5px)"
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            dispatch(closeModal());
          }
        }}
      >
        <Box pa="25px 50px" bg="#000" br="10px" color="#fff" textAlign="center">
          <H4>{message}</H4>
          <Box mt="25px">
            <Button
              bg="#027a12"
              onClick={async () => {
                await onSubmit(...args);
                dispatch(closeModal());
              }}
            >
              <FontAwesomeIcon icon={faCheck} color="#fff" />
            </Button>
            <Button bg="#777" onClick={() => dispatch(closeModal())}>
              <FontAwesomeIcon icon={faXmark} color="#fff" />
            </Button>
          </Box>
        </Box>
      </FixedBox>
    </>
  );
};

export default Modal;
