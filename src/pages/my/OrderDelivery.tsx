import {
  faCircleCheck,
  faClipboard,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBoxOpen,
  faClipboardCheck,
  faCube,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import React, { useLayoutEffect, useState } from 'react';
import {
  A,
  Box,
  FlexBox,
  GlobalProps,
  IBBox,
  P,
  Span,
} from '../../components/Styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderDelivery, useGerOrderDeliveryQuery } from '../../app/apiSlice';
import Spinner from '../../components/Spinner';

const DELIVERY_ICON = [
  { id: 1, name: '주문 완료', icon: faClipboard },
  { id: 2, name: '주문 접수', icon: faCube },
  { id: 3, name: '배송 준비', icon: faBoxOpen },
  { id: 4, name: '배송 중', icon: faTruck },
  { id: 5, name: '배송 완료', icon: faCircleCheck },
  { id: 6, name: '교환 접수', icon: faClipboardCheck },
  { id: 7, name: '교환 완료', icon: faCircleCheck },
  { id: 8, name: '반품 접수', icon: faClipboardCheck },
  { id: 9, name: '반품 완료', icon: faCircleCheck },
  { id: 10, name: '환불 완료', icon: faCircleCheck },
];

interface OrderDeliverProps extends GlobalProps {
  orderId: number;
}

const OrderDelivery = ({ orderId }: OrderDeliverProps) => {
  const [company, setCompany] = useState({
    name: '',
    number: '0000-0000-0000',
    url: '',
  });
  const [delivery, setDelivery] = useState<OrderDelivery[]>([]);
  const {
    data: getDelivery,
    isLoading,
    isSuccess,
    isFetching,
  } = useGerOrderDeliveryQuery(orderId, {
    skip: orderId === -1,
  });

  useLayoutEffect(() => {
    if (isSuccess && !isFetching) {
      setDelivery(getDelivery.data);
      setCompany({
        name: getDelivery.data[0].companyName,
        number: getDelivery.data[0].number,
        url: getDelivery.data[0].companyUrl.replace(
          '${number}',
          getDelivery.data[0].number.replace(/-/g, '')
        ),
      });
    }
  }, [isSuccess, isFetching, orderId]);

  return (
    <>
      <Box pa="15px 25px" posit="relative" bg="#fff" br="15px">
        {isLoading && (
          <FlexBox hei="300px">
            <Spinner size="xl" />
          </FlexBox>
        )}
        {delivery.length !== 0 && (
          <>
            <Box>
              <P>
                {company.name}
                <A ml="7px" href={company.url} target="_blank">
                  {company.number}
                </A>
              </P>
            </Box>
            {delivery.map((d, i) => {
              const index = d.statusId - 1;
              const regist = new Date(d.regist);
              return (
                <Box key={`${d.orderId}-${d.statusId}`} mt="15px">
                  <Box>
                    <IBBox wid="25px" textAlign="center">
                      <FontAwesomeIcon
                        icon={DELIVERY_ICON[index].icon}
                        size="lg"
                      />
                    </IBBox>
                    <Span
                      ml="12px"
                      ftSize="1.1rem"
                      ftWeight="bold"
                      letterSpacing="0.5px"
                    >
                      {d.status}
                    </Span>
                  </Box>
                  <Box
                    ma="10px"
                    pa="0 15px"
                    bdLeft={i !== delivery.length - 1 ? '2px solid #aaa' : ''}
                  >
                    <P color="#aaa">
                      <Span>{regist.getFullYear()}년</Span>
                      <Span ma="0 5px">{regist.getMonth() + 1}월</Span>
                      <Span>{regist.getDate()}일</Span>
                    </P>
                    {[4, 5, 7, 9, 10].includes(d.statusId) && (
                      <P ma="10px 0">
                        해당 상품이
                        <Span
                          ml="7px"
                          ftWeight="bold"
                          textDecoration="underline"
                        >
                          {d.status}
                        </Span>
                        {d.statusId === 4 ? '입니다' : '되었습니다.'}
                      </P>
                    )}
                  </Box>
                </Box>
              );
            })}
          </>
        )}
      </Box>
    </>
  );
};

export default OrderDelivery;
