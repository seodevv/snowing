import React from 'react';
import { FlexBox, Img } from '../../components/Styled';
import styled from 'styled-components';

const Items = styled(FlexBox)`
  width: 100%;

  .item {
    padding: 10px;
    padding-top: 25%;
    position: relative;
    min-width: 25%;
    overflow: hidden;
  }

  .image {
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const ProductSlider = (): JSX.Element => {
  return (
    <>
      <FlexBox wid="100%" flexDir="row" flexWrap="nowrap" overflow="hidden">
        <Items>
          <div className="item">
            <img
              className="image"
              src='https://static.wixstatic.com/media/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg/v1/fill/w_441,h_441,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg" alt="Rains Dili Mesh Vest in camo on model'
            />
            <p>Rains Dill Mesh Vest | camo</p>
          </div>
          <div className="item">
            <img
              className="image"
              src='https://static.wixstatic.com/media/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg/v1/fill/w_441,h_441,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg" alt="Rains Dili Mesh Vest in camo on model'
            />
            <p>Rains Dill Mesh Vest | camo</p>
          </div>
          <div className="item">
            <img
              className="image"
              src='https://static.wixstatic.com/media/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg/v1/fill/w_441,h_441,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg" alt="Rains Dili Mesh Vest in camo on model'
            />
            <p>Rains Dill Mesh Vest | camo</p>
          </div>
          <div className="item">
            <img
              className="image"
              src='https://static.wixstatic.com/media/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg/v1/fill/w_441,h_441,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg" alt="Rains Dili Mesh Vest in camo on model'
            />
            <p>Rains Dill Mesh Vest | camo</p>
          </div>
          <div className="item">
            <img
              className="image"
              src='https://static.wixstatic.com/media/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg/v1/fill/w_441,h_441,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/426dec_e573a6cec25c4c8981e1c2740762c558~mv2.jpg" alt="Rains Dili Mesh Vest in camo on model'
            />
            <p>Rains Dill Mesh Vest | camo</p>
          </div>
        </Items>
      </FlexBox>
    </>
  );
};

export default ProductSlider;
