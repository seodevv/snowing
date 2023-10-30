import React from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import { useGetProductDetailQuery } from '../../app/apiSlice';

const DetailsBox = styled(Box)`
  margin-top: 25px;

  ul {
    margin: 5px 0;
    list-style-type: circle;
    line-height: 1.5rem;
  }
`;

interface DetailsProps {
  id: string | undefined;
}

const ProductDetails = ({ id }: DetailsProps) => {
  const {
    data: details = {
      data: [
        {
          id: -1,
          detail: -1,
          text: 'loading',
        },
      ],
    },
  } = useGetProductDetailQuery(id, { skip: !id });
  return (
    <>
      <DetailsBox>
        <p>Details:</p>
        <ul>
          {details.data.map((detail) => (
            <li key={detail.id + detail.detail}>{detail.text}</li>
          ))}
        </ul>
      </DetailsBox>
    </>
  );
};

export default ProductDetails;
