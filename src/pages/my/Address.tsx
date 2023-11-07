import React, { Dispatch, SetStateAction } from 'react';
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
import { Addresses, useDeleteAddressMutation } from '../../app/apiSlice';
import PostImage from '../../img/POST.png';
import StampImage from '../../img/STAMP.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faSquare } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { showModal } from '../../app/slice';

const AddressBox = styled(Box)`
  margin-top: 15px;
  position: relative;
  background: #eee;
  animation: fade-in 0.3s ease-in;
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
  flex: 1;
  border-right: 2px solid #000;
`;

const InfoBox = styled(FlexBox)`
  padding: 0 15px;
  flex-direction: column;
  flex: 1;

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

const DeleteBox = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  visibility: hidden;
  opacity: 0;
  transition: 0.1s all ease-in;

  &:hover {
    scale: 1.2;
  }

  &:active {
    scale: 1.1;
    transition: none;
  }
`;

const EditBox = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  visibility: hidden;
  opacity: 0;

  svg {
    transition: 0.1s all ease-in;
  }

  svg:first-of-type {
    margin-right: 10px;
  }

  svg:hover {
    scale: 1.2;
  }

  svg:active {
    scale: 1.1;
    transition: none;
  }
`;

interface AddressProps extends GlobalProps {
  item: Addresses;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setEditId: Dispatch<SetStateAction<number>>;
}

const Address = ({
  item,
  setEdit,
  setEditId,
  wid = '100%',
  hei,
}: AddressProps) => {
  const dispatch = useDispatch();
  const app = process.env.REACT_APP_ID || 'Snowing';
  const postal_code =
    item.postal_code === 0
      ? Array(5).fill('-')
      : [...item.postal_code.toString()];

  const [deleteAddress] = useDeleteAddressMutation();
  const onDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id);
    } catch (error) {}
  };

  return (
    <>
      <AddressBox wid={wid} hei={hei}>
        <Card>
          <Box mt="10px" textAlign="center">
            <H1 ftSize="2rem" letterSpacing="3px">
              {item.isDefault ? 'DEFAULT ADDRESS' : 'ADDRESS'}
            </H1>
          </Box>
          <FlexBox ma="15px" flexWrap="nowrap" flexGrow={1}>
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
          <EditBox className="edit">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                dispatch(
                  showModal({
                    message: '해당 주소를 삭제하시겠습니까?',
                    onSubmit: onDeleteAddress,
                    args: [item.id],
                  })
                );
              }}
            />
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => {
                setEdit(true);
                setEditId(item.id);
              }}
            />
          </EditBox>
        </Card>
      </AddressBox>
    </>
  );
};

export default Address;
