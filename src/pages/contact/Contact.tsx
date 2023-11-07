import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Container, FlexBox } from '../../components/Styled';
import ProductBanner from '../main/ProductBanner';
import { useGetContactQuery } from '../../app/apiSlice';
import ContactUs from './ContactUs';
import VisitUs from './VisitUs';
import ContactForm from './ContactForm';
import Maps from '../../components/Maps';

const ContactBox = styled(Container)`
  margin-top: 100px;
`;

const ContactInfo = styled(FlexBox)`
  margin: 75px;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.1rem;
  color: #777;

  > div {
    padding: 15px;
    flex: 1;
    max-width: 500px;
  }
`;

const ContactMap = styled(Box)`
  width: 100%;
  height: 500px;
  background: #fff;
`;

const ContactVideo = styled(Box)`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface ContactInfo {
  desc: string;
  email: string;
  phone: string;
  open: string;
  open_desc: string;
  address: string;
  address_number: string;
}

const Contact = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    desc: 'description',
    email: 'example@example.com',
    phone: '02.1234.5678',
    open: 'Monday-Friday\r\nSaturday\r\nSunday',
    open_desc: 'Hello',
    address: 'in Seoul, Republic of korea',
    address_number: '12345',
  });
  const {
    data: getContact,
    isSuccess,
    isFetching,
    isError,
  } = useGetContactQuery({});

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      let item: ContactInfo = { ...contactInfo };
      getContact.data.forEach((v) => {
        item[v.key] = v.value;
      });
      setContactInfo(item);
    } else if (isError) {
      setContactInfo((prev) => ({
        ...prev,
        desc: 'Sorry, Server Error\r\nPlease try again',
      }));
    }
  }, [isSuccess, isFetching, isError]);

  return (
    <>
      <ContactBox>
        <ProductBanner type="banner" name="contact" title=" " pa="0" />
        <ContactInfo>
          <ContactUs
            desc={contactInfo.desc}
            email={contactInfo.email}
            phone={contactInfo.phone}
          />
          <VisitUs
            open={contactInfo.open}
            open_desc={contactInfo.address_number}
            address={contactInfo.address}
            address_number={contactInfo.address_number}
          />
          <ContactForm />
        </ContactInfo>
        <ContactMap>
          <Maps />
        </ContactMap>
        <ContactVideo>
          <iframe
            width="960"
            height="540"
            src="https://www.youtube.com/embed/gQlPel6OjYY?si=AAXlBf0opq1TA10p"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </ContactVideo>
      </ContactBox>
    </>
  );
};

export default Contact;
