import React from 'react';
import styled from 'styled-components';
import {
  Box,
  FlexBox,
  GlobalProps,
  H1,
  H4,
  P,
  Span,
} from '../../components/Styled';
import { Addresses } from '../../app/apiSlice';
import PostImage from '../../img/POST.png';
import StampImage from '../../img/STAMP.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

const AddressBox = styled(Box)`
  margin-top: 25px;
  position: relative;
  background: #eee;
  animation: fade-in 0.3s ease-in;

  &:first-of-type {
    margin-top: 0;
  }
`;

const Card = styled(Box)`
  margin: 0 auto 5px auto;
  padding: 15px;
  width: 540px;
  height: 360px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: url(${PostImage});
  background-size: contain;
  background-repeat: no-repeat;
  font-family: 'East Sea Dokdo', sans-serif;
  font-size: 1.7rem;
  box-shadow: 0 0 5px #000;

  .address {
    font-size: 2rem;
    letter-spacing: 3px;
  }

  &:hover .edit {
    visibility: visible;
    opacity: 1;
  }
`;

const DearBox = styled(FlexBox)`
  padding: 15px;
  flex-direction: column;
  align-items: unset;
  flex: 1;
  border-right: 2px solid #000;
`;

const InfoBox = styled(FlexBox)`
  padding: 0 15px;
  flex-direction: column;
  align-items: unset;
  flex: 1.618;

  .postal-code {
    margin-right: 3px;
    padding: 3px 6px;
    border: 1px solid #c52c1e;
  }
`;

const StampBox = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 20%;

  img {
    width: 100%;
    height: 100%;
  }
`;

const DefaultBox = styled(Box)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

interface AddressProps extends GlobalProps {
  item: Addresses;
}

const Address = ({ item, wid = '100%', hei }: AddressProps) => {
  const app = process.env.REACT_APP_ID || 'Snowing';
  const postal_code =
    item.postal_code === 0
      ? Array(5).fill('-')
      : [...item.postal_code.toString()];

  return (
    <>
      <AddressBox wid={wid} hei={hei}>
        <Card>
          <Box mt="10px" textAlign="center">
            <H1 ftSize="2rem" letterSpacing="3px">
              {item.isDefault ? 'DEFAULT ADDRESS' : 'ADDRESS'}
            </H1>
          </Box>
          <FlexBox
            ma="15px"
            flexWrap="nowrap"
            flexGrow={1}
            flexAlignItem="unset"
          >
            <DearBox>
              <H4>
                <Span mr="10px">From.</Span>
                <Span textDecoration="underline" textUnderlineOffset="5px">
                  {app}
                </Span>
              </H4>
              <Box flexGrow={1} />
              <H4 mr="10px" textAlign="right">
                <Span mr="10px">To.</Span>
                <Span
                  textDecoration="underline"
                  textUnderlineOffset="5px"
                >{`${item.firstName} ${item.lastName}`}</Span>
              </H4>
            </DearBox>
            <InfoBox>
              <Box flexGrow={1}></Box>
              <P>{item.country}</P>
              <P letterSpacing="-1px">{`${item.province} ${item.city} ${item.address} ${item.etc}`}</P>
              <P mt="5px" textAlign="right">
                {item.phone}
              </P>
              <P mt="5px" textAlign="right">
                {postal_code.map((v, i) => (
                  <Span key={i} className="postal-code">
                    {v}
                  </Span>
                ))}
              </P>
            </InfoBox>
          </FlexBox>
          <StampBox>
            <img src={StampImage} alt={StampImage} />
          </StampBox>
          <DefaultBox>
            <FontAwesomeIcon
              icon={item.isDefault ? faSquareCheck : faSquare}
              color="#0f6da3"
            />
          </DefaultBox>
        </Card>
      </AddressBox>
    </>
  );
};

export default Address;
