import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { FixedBox } from '../../components/Feed';
import { Box, FlexBox } from '../../components/Styled';
import Selector, { SelectorData } from '../../components/Selector';
import Input from '../../components/Input';
import { phone_regex } from '../contact/ContactForm';
import {
  Addresses,
  useGetCountryQuery,
  useGetProvinceQuery,
  usePostAddressMutation,
} from '../../app/apiSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/slice';
import Spinner from '../../components/Spinner';

const MyFixedBox = styled(FixedBox)`
  backdrop-filter: blur(5px);
`;

const AddBox = styled(Box)`
  padding: 25px;
  position: relative;
  width: 90%;
  max-width: 840px;
  background: #000;
  border-radius: 15px;
  color: #fff;
  box-shadow: 0 0 10px #777;

  .header {
    font-size: 1.3rem;
    letter-spacing: 1px;
  }

  .form {
    margin: 25px 0;

    input[type='checkbox'] {
      scale: 1.3;
      transition: 0.3s all ease-in;
      cursor: pointer;
    }

    input[type='checkbox'] + label {
      margin-left: 10px;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }

  .close {
    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
    }
  }

  button {
    padding: 15px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
    }
  }

  button + button {
    margin-left: 10px;
  }

  .cancle {
    background: transparent;
    color: #0251ac;
  }

  .submit {
    background: #0251ac;
    color: #fff;
  }

  .error {
    outline: 2px solid #f00 !important;
    animation: error 0.3s ease !important;
    transition: none !important;
  }

  .error + .error-box::after {
    content: '올바른 값을 입력해주세요.';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
    font-size: 0.8rem;
  }
`;

const LoadingBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

const initialSelectorData = {
  data: [{ id: -1, name: 'Loading' }],
  id: -1,
};

const errorSelectorData = {
  data: [{ id: -1, name: 'error' }],
  id: -1,
};

export const WORD_REGEX = /^[0-9a-zA-Z가-힣\s-\.\,]+$/;
export const POSTAL_CODE_REGEX = /^[0-9]{5}$/;

export interface Edit {
  flag: boolean;
  id: number;
}

interface AddressFormProps {
  first?: boolean;
  edit?: Addresses;
  setState: Dispatch<SetStateAction<boolean>>;
}

const AddressForm = ({ first, edit, setState }: AddressFormProps) => {
  const user = useSelector(selectUser);

  const [isDefault, setIsDefault] = useState(
    edit ? !!edit.isDefault : first ? true : false
  );
  const [country, setCountry] = useState<SelectorData>(initialSelectorData);
  const [lastName, setLastName] = useState(edit ? edit.lastName : '');
  const [firstName, setFirstName] = useState(edit ? edit.firstName : '');
  const [postalCode, setPostalCode] = useState(
    edit ? (edit.postal_code !== 0 ? edit.postal_code.toString() : '') : ''
  );
  const [province, setProvince] = useState<SelectorData>(initialSelectorData);
  const [city, setCity] = useState(edit ? edit.city : '');
  const [address, setAddress] = useState(edit ? edit.address : '');
  const [etc, setEtc] = useState(edit ? edit.etc : '');
  const [phone, setPhone] = useState(edit ? edit.phone : '010-');

  const lastNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const onFocusElement = (ref: RefObject<HTMLInputElement>) => {
    if (!ref.current) return;
    ref.current.classList.add('error');
    ref.current.focus();
  };

  const [postAddress, { isLoading }] = usePostAddressMutation();
  const onSubmitAddress = async () => {
    if (lastName.trim() === '' || !WORD_REGEX.test(lastName))
      return onFocusElement(lastNameRef);
    if (firstName.trim() === '' || !WORD_REGEX.test(firstName))
      return onFocusElement(firstNameRef);
    if (postalCode.trim() !== '' && !POSTAL_CODE_REGEX.test(postalCode))
      return onFocusElement(postalCodeRef);
    if (city.trim() === '' || !WORD_REGEX.test(city))
      return onFocusElement(cityRef);
    if (address.trim() === '' || !WORD_REGEX.test(address))
      return onFocusElement(addressRef);
    if (phone.trim() === '' || !phone_regex.test(phone))
      return onFocusElement(phoneRef);
    if (!user) return;

    const body: Omit<Addresses, 'country' | 'province'> & {
      type: 'add' | 'edit';
    } = {
      type: edit ? 'edit' : 'add',
      id: edit ? edit.id : -1,
      userId: user.id,
      isDefault: isDefault,
      countryId: country.id,
      provinceId: province.id,
      lastName,
      firstName,
      postal_code: Number(postalCode),
      city,
      address,
      etc,
      phone,
    };

    try {
      await postAddress(body);
      setState(false);
    } catch (error) {}
  };

  const {
    data: getCountries,
    isSuccess: ContrySuc,
    isError: ContryErr,
  } = useGetCountryQuery();

  const {
    data: getProvinces,
    isSuccess: provinceSuc,
    isFetching: provinceFet,
    isError: provinceErr,
  } = useGetProvinceQuery(country.id, { skip: country.id === -1 });

  useLayoutEffect(() => {
    if (ContrySuc) {
      setCountry({
        data: getCountries.data.map((v) => ({
          id: v.countryId,
          name: v.country,
        })),
        id: edit ? edit.countryId : getCountries.data[0].countryId,
      });
    } else if (ContryErr) {
      setCountry(errorSelectorData);
    }
  }, [ContrySuc, ContryErr]);

  useLayoutEffect(() => {
    if (provinceSuc && !provinceFet) {
      if (getProvinces.data.length !== 0) {
        setProvince({
          data: getProvinces.data.map((v) => ({
            id: v.provinceId,
            name: v.province,
          })),
          id: edit ? edit.provinceId : getProvinces.data[0].provinceId,
        });
      } else {
        setProvince({
          data: [],
          id: -1,
        });
      }
    } else if (provinceErr) {
      setProvince(errorSelectorData);
    }
  }, [provinceSuc, provinceFet, provinceErr, country.id]);

  return (
    <>
      <MyFixedBox
        bg="rgba(0,0,0,0.7)"
        onClick={(e) => {
          if (e.currentTarget === e.target) setState(false);
        }}
      >
        <AddBox className="add-box">
          {isLoading && (
            <LoadingBox bg="rgba(0,0,0,0.75)">
              <Spinner color="#fff" size="2xl" />
            </LoadingBox>
          )}
          <div className="header">
            <span>{edit ? 'Edit' : 'Add'} address</span>
          </div>
          <div className="form">
            <Box ma="15px" ml="0">
              <input
                type="checkbox"
                id="default"
                checked={isDefault}
                onChange={(e) => {
                  if (first || edit?.isDefault) return;
                  setIsDefault(e.target.checked);
                }}
              />
              <label htmlFor="default">
                이 주소를 기본 배송지로 설정합니다.
              </label>
            </Box>
            <Selector
              label={'Contry / region'}
              status={country}
              setStatus={setCountry}
              bg="#000"
            />
            <FlexBox
              ma="15px 0"
              flexJustCon="space-between"
              flexAlignItem="center"
              hei="50px"
            >
              <Input
                ref={lastNameRef}
                label="성"
                state={lastName}
                setState={setLastName}
                require
                limit={16}
                wid="calc(50% - 7.5px)"
                color="#fff"
              />
              <Input
                ref={firstNameRef}
                label="이름"
                state={firstName}
                setState={setFirstName}
                limit={16}
                require
                ma="0"
                wid="calc(50% - 7.5px)"
                color="#fff"
              />
            </FlexBox>
            <Input
              ref={postalCodeRef}
              label="우편번호"
              state={postalCode}
              setState={setPostalCode}
              limit={5}
              regex={/^[0-9\s]+$/}
              color="#fff"
            />
            <FlexBox
              ma="15px 0"
              flexJustCon="space-between"
              flexAlignItem="center"
              wid="100%"
              hei="50px"
            >
              <Selector
                label={'Province'}
                status={province}
                setStatus={setProvince}
                bg="#000"
                wid="calc(50% - 7.5px)"
              />
              <Input
                ref={cityRef}
                label="시/군/구"
                state={city}
                setState={setCity}
                limit={16}
                require
                wid="calc(50% - 7.5px)"
                color="#fff"
              />
            </FlexBox>
            <Input
              ref={addressRef}
              label="주소"
              state={address}
              setState={setAddress}
              require
              color="#fff"
            />
            <Input
              label="기타 주소"
              state={etc}
              setState={setEtc}
              color="#fff"
            />
            <Input
              ref={phoneRef}
              label="전화번호"
              state={phone}
              setState={setPhone}
              require
              color="#fff"
              phone
            />
          </div>
          <Box textAlign="right">
            <button className="cancle" onClick={() => setState(false)}>
              Cancle
            </button>
            <button className="submit" onClick={() => onSubmitAddress()}>
              {edit ? 'Edit' : 'Save'}
            </button>
          </Box>
        </AddBox>
      </MyFixedBox>
    </>
  );
};

export default AddressForm;
