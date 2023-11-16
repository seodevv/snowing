import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Box, Button, FlexBox, H1, P } from '../../components/Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import OrderDelivery from './OrderDelivery';
import { Detail, initialDetail } from './MyOrder';

const FixedBox = styled(FlexBox)`
  padding: 25px;
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 1;
  width: 100%;
  align-items: flex-start;
  height: calc(100dvh - 100px);
  background: #f5f5f5;
  box-shadow: 0 0 5px #000;
  visibility: hidden;
  opacity: 0;
  transform: translateX(50%);
  transition: 0.5s all ease-in-out;
`;

const Inner = styled(Box)`
  width: 100%;
  max-width: 980px;
`;

interface OrderDetailProps {
  state: Detail;
  setState: Dispatch<SetStateAction<Detail>>;
}

const OrderDetail = ({ state, setState }: OrderDetailProps) => {
  return (
    <>
      <FixedBox className={state.flag ? 'visible' : ''}>
        <Inner>
          <FlexBox ma="15px" wid="100%">
            <Box>
              <Button pa="12px" onClick={() => setState(initialDetail)}>
                <FontAwesomeIcon icon={faChevronLeft} size="xl" />
              </Button>
            </Box>
            <Box>
              <H1>#{state.orderId} 주문</H1>
              <P>확인 날짜 : 10월 6일</P>
            </Box>
            <Box flexGrow={1}></Box>
            <Box>
              <Button pa="12px" bg="#fff" bd="2px solid #ccc">
                재구매
              </Button>
            </Box>
          </FlexBox>
          <FlexBox ma="25px">
            <Box flex={1.5}>
              <OrderDelivery orderId={state.orderId} />
            </Box>
            <Box flex={1}></Box>
          </FlexBox>
        </Inner>
      </FixedBox>
    </>
  );
};

export default OrderDetail;
