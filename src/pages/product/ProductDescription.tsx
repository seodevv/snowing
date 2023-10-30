import React from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import ProductDetails from './ProductDetails';

const DescBox = styled(Box)`
  margin: 25px 0 5px;
  height: 5rem;
  font-size: 1rem;
  line-height: 1.7rem;
  overflow: hidden;

  .details {
    margin-top: 25px;

    ul {
      margin: 5px 0;
      list-style-type: circle;
      line-height: 1.5rem;
    }
  }
`;

interface DescriptionProps {
  id: string | undefined;
  desc: string;
  status: boolean;
}

const ProductDescription = ({ id, desc, status }: DescriptionProps) => {
  return (
    <>
      <DescBox className={`desc ${status && 'active'}`}>
        {desc.split(/\r\n|\r|\n/).map((text, i) => (
          <span key={i}>
            {text}
            <br />
          </span>
        ))}
        <ProductDetails id={id} />
      </DescBox>
    </>
  );
};

export default ProductDescription;
