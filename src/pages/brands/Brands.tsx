import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../components/Styled';
import { Brands } from '../../app/apiSlice';
import { useParams } from 'react-router-dom';
import BrandsPortal from './BrandsPortal';
import BrandView from './BrandView';

const BrandsBox = styled(Container)`
  margin-top: 100px;
  animation: fade-in 0.5s ease-in;
`;

const Brands = () => {
  const { name } = useParams();

  const [brand, setBrand] = useState<string | undefined>(name);

  useLayoutEffect(() => {
    setBrand(name);
  }, [name]);

  return (
    <>
      <BrandsBox key={brand}>
        {brand ? <BrandView brand={brand} /> : <BrandsPortal />}
      </BrandsBox>
    </>
  );
};

export default Brands;
