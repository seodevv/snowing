import React from 'react';
import { FixedBox } from './Feed';
import { Box } from './Styled';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { closeNewsletter } from '../app/slice';
import { usePostSubscribeMutation } from '../app/apiSlice';

const NewsletterBox = styled(Box)`
  .email {
    margin-top: 5px;
    color: #ffe0cb;
  }

  .confirm {
    margin-top: 15px;
    padding: 6px 12px;
    background: #4770f4;
    border: none;
    border-radius: 5px;
    color: #fff;
  }
`;

interface NewsletterProps {
  email: string;
}

const Newsletter = ({ email }: NewsletterProps) => {
  const dispatch = useDispatch();
  const [subscribe] = usePostSubscribeMutation();

  const onClickConfirm = () => {
    dispatch(closeNewsletter());
    try {
      subscribe(email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FixedBox bg="rgba(255, 255, 255, 0.5)">
        <NewsletterBox
          pa="25px 50px"
          bg="#000"
          color="#fff"
          textAlign="center"
          br="10px"
        >
          <h4>Thank you for subscribing.</h4>
          <p className="email">{email}</p>
          <button className="confirm btn-effect" onClick={onClickConfirm}>
            OK
          </button>
        </NewsletterBox>
      </FixedBox>
    </>
  );
};

export default Newsletter;
