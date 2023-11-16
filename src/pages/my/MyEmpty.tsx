import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';

const EmptyBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  .title {
    font-size: 1.7rem;
    letter-spacing: 0.5px;
  }
`;

interface MyEmptyProps {
  text: string;
  element?: ReactNode;
  wid?: string;
  hei?: string;
}

const MyEmpty = ({ text, element, wid = '100%', hei }: MyEmptyProps) => {
  return (
    <>
      <EmptyBox wid={wid} hei={hei}>
        <p className="title">You haven't saved any {text} yet</p>
        {element}
      </EmptyBox>
    </>
  );
};

export default MyEmpty;
