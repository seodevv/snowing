import React from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';

const VisitUsBox = styled(Box)`
  .title {
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 3px;
  }

  .open {
    margin-top: 40px;
    font-weight: bold;
    line-height: 1.3rem;
    letter-spacing: 1px;
  }

  .open-desc,
  .address {
    margin-top: 25px;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.3rem;
  }

  .address {
    font-size: 1.1rem;
  }
`;

interface VisitUsProps {
  open: string;
  open_desc: string;
  address: string;
  address_number: string;
}

const VisitUs = ({
  open,
  open_desc,
  address,
  address_number,
}: VisitUsProps) => {
  return (
    <>
      <VisitUsBox>
        <div className="title">
          <span>VISIT US</span>
        </div>
        <div className="open">
          {open.split(/\r\n|\r|\n/).map((v) => (
            <span key={v}>
              {v}
              <br />
            </span>
          ))}
        </div>
        <div className="open-desc">
          <span>{open_desc}</span>
        </div>
        <div className="address">
          <span>
            {address}
            <br />
          </span>
          <span>{address_number}</span>
        </div>
      </VisitUsBox>
    </>
  );
};

export default VisitUs;
