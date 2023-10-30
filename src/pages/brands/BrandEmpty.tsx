import React from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';

const EmptyBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

interface BrandEmptyProps {
  brand?: string;
  wid?: string;
  hei?: string;
  bd?: string;
  boxShadow?: string;
}

const BrandEmpty = ({
  brand,
  wid = '100%',
  hei = '70dvh',
  bd = 'none',
  boxShadow = 'unset',
}: BrandEmptyProps) => {
  return (
    <>
      <EmptyBox wid={wid} hei={hei} bd={bd} boxShadow={boxShadow}>
        <h1>
          The{' '}
          {!brand || brand === 'all'
            ? 'product'
            : brand.replace(/^[a-z]/, (v) => v.toUpperCase())}{' '}
          is being prepared.
        </h1>
        <p>The following products will be released soon 😊</p>
      </EmptyBox>
    </>
  );
};

export default BrandEmpty;
