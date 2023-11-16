import React from 'react';
import {
  Box,
  FlexBox,
  FlexColumnBox,
  FlexGrowBox,
  GlobalProps,
  H2,
  Img,
  Span,
} from '../../components/Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  faCcAmex,
  faCcJcb,
  faCcMastercard,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons';
import ICImage from '../../img/IC.png';
import GoldImage from '../../img/gold.jpeg';
import styled from 'styled-components';
import { Wallets } from './MyWallets';

const CreditCardBox = styled(FlexColumnBox)`
  padding: 15px 35px;
  position: relative;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1.618 / 1;
  border: none;
  border-radius: 15px;
  font-family: 'Dancing Script';
  box-shadow: 2px 3px 15px #000;
  overflow: hidden;

  > div {
    margin: 10px 0;
    position: relative;
    width: 100%;
  }

  .gold {
    background-image: url(${GoldImage});
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    font-weight: bold;
    color: transparent;
    filter: brightness(1.3);
  }

  .grid {
    display: grid;
    grid-template-areas:
      '. header'
      'valid date'
      'valid date';

    > div {
      padding: 0 6px;
    }

    .header {
      grid-area: header;
    }

    .valid {
      grid-area: valid;
    }

    .date {
      grid-area: date;
    }
  }
`;

const RotateBox = styled(Box)`
  position: absolute !important;
  width: 200% !important;
  height: 200%;
  transform: translate(40%, -70%) rotate(150deg);
  transition: 0.3s all ease-in;
`;

interface CreditCardProps extends GlobalProps {
  item: Wallets;
  bgSub?: string;
}

const CreditCard = ({
  item,
  wid = '90%',
  minWid = '500px',
  maxWid = '500px',
  bg = '#181818',
  bgSub = '#2b2b2b',
}: CreditCardProps) => {
  let icon: IconDefinition;
  switch (item.card_type) {
    case 'visa':
      icon = faCcVisa;
      break;
    case 'master':
      icon = faCcMastercard;
      break;
    case 'amex':
      icon = faCcAmex;
      break;
    case 'jcb':
      icon = faCcJcb;
      break;
  }

  return (
    <>
      <CreditCardBox wid={wid} minWid={minWid} maxWid={maxWid} bg={bg}>
        <RotateBox bg={bgSub} className="rotate"></RotateBox>
        <FlexBox wid="100%" posit="relative" ftSize="1.5rem" color="#fff">
          <Box>
            <Span className="gold">Credit Card</Span>
          </Box>
          <FlexGrowBox />
          <Box>
            <FontAwesomeIcon icon={icon} size="2xl" color="#ddd" />
          </Box>
        </FlexBox>
        <Box hei="50px" textAlign="left">
          <Img src={ICImage} alt={ICImage} height="100%" />
        </Box>
        <FlexBox flexJustCon="space-between" ftSize="1.7rem" color="#fff">
          {item.card_number.split(',').map((c, i) => {
            const isHide = i === 1 || i === 2;
            return (
              <Box
                key={i}
                pt={isHide ? '5px' : '0'}
                wid="25%"
                textAlign="center"
                letterSpacing="3px"
              >
                <Span className="gold">{isHide ? '****' : c}</Span>
              </Box>
            );
          })}
        </FlexBox>
        <Box
          ma="-5px 100px -10px 0 !important"
          ftSize="0.9rem"
          color="#fff"
          textAlign="right"
        >
          <Box ma="-10px" dis="inline-block" ftSize="1rem">
            <div className="grid gold">
              <div className="header">MM / YY</div>
              <FlexBox className="date">
                {item.expiration.replace('/', ' / ')}
              </FlexBox>
              <Box
                className="valid"
                textAlign="center"
                ftSize="0.9rem"
                letterSpacing="-1px"
              >
                <span>
                  VALID
                  <br />
                </span>
                <span>THUR</span>
              </Box>
            </div>
          </Box>
        </Box>
        <Box>
          <H2 className="gold" ftSize="1.7rem" letterSpacing="3px">
            {item.cardHolderName}
          </H2>
        </Box>
      </CreditCardBox>
    </>
  );
};

export default CreditCard;
