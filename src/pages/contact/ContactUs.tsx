import React from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';

const ContactUsBox = styled(Box)`
  .title {
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 3px;
  }

  .desc {
    margin-top: 40px;
    line-height: 2rem;
    letter-spacing: 1px;
  }

  .email,
  .phone {
    margin-top: 15px;
    word-spacing: 5px;
    letter-spacing: 1px;
  }
`;

interface ContactUsProps {
  desc: string;
  email: string;
  phone: string;
}

const ContactUs = ({ desc, email, phone }: ContactUsProps) => {
  return (
    <>
      <ContactUsBox>
        <div className="title">
          <span>CONTACT US</span>
        </div>
        <div className="desc">
          {desc.split(/\r\n|\r|\n/).map((v) => (
            <span key={v}>
              {v}
              <br />
            </span>
          ))}
        </div>
        <div className="email">
          <span>Email {email}</span>
        </div>
        <div className="phone">
          <span>Phone {phone}</span>
        </div>
      </ContactUsBox>
    </>
  );
};

export default ContactUs;
