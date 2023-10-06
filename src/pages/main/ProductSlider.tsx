import React from 'react';
import { FlexBox } from '../../components/Styled';
import styled from 'styled-components';
import { useGetNewProductsQuery } from '../../app/apiSlice';

const Items = styled(FlexBox)`
  width: 100%;

  .item {
    padding: 10px;
    padding-top: 25%;
    position: relative;
    min-width: 25%;
    overflow: hidden;
  }

  .image,
  .hover {
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .hover {
    visibility: hidden;
    opacity: 0;
  }
`;

const ProductSlider = (): JSX.Element => {
  const { data: products, isSuccess } = useGetNewProductsQuery();

  let content;
  if (isSuccess) {
    content = products.data.map((item) => {
      console.log(item);
      return (
        <div key={item.id} className="item">
          <img className="image" />
          <img className="hover" />
          <p>{item.name}</p>
        </div>
      );
    });
  }

  return (
    <>
      <FlexBox wid="100%" flexDir="row" flexWrap="nowrap" overflow="hidden">
        <Items>{content}</Items>
      </FlexBox>
    </>
  );
};

export default ProductSlider;
