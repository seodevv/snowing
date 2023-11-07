import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Box } from '../../components/Styled';
import { usePostEnquireMutation } from '../../app/apiSlice';

const FormBox = styled(Box)`
  position: relative;

  input,
  textarea {
    margin: 5px;
    padding: 12px;
    width: calc(50% - 10px);
    border: none;
    border-bottom: 2px solid #000;
    font-size: 1rem;
    outline: none;
    resize: none;
  }

  textarea {
    width: 100%;
    height: 5rem;
  }

  .wrong {
    border-bottom: 2px solid #f00;
    animation: wrong 0.3s ease-in;
  }

  .limit {
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 0.9rem;

    .red {
      font-weight: bold;
      color: red;
    }
  }

  .error {
    margin-bottom: 15px;
    font-size: 0.9rem;
    color: #f00;
    text-align: center;
    animation: wrong 0.3s ease-in;
  }

  .submit {
    padding: 12px;
    width: 100%;
    background: #000;
    border: none;
    font-size: 1.1rem;
    font-weight: 100;
    color: #fff;
    letter-spacing: 1px;
    transition: 0.1s opacity ease-in;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
      transition: none;
    }
  }

  @keyframes wrong {
    0% {
      transform: translateX(-2px);
    }

    33% {
      transform: translateX(2px);
    }

    66% {
      transform: translateX(-2px);
    }

    100% {
      transform: translateX(2px);
    }
  }
`;

const AlertBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  animation: fade-in 0.3s ease-in;

  .message {
    padding: 15px;
    background: #000;
    border-radius: 10px;
    font-size: 0.9rem;
    text-align: center;
    line-height: 1.5rem;
  }

  .ok {
    margin-top: 10px;
    padding: 6px 12px;
    background: #0c92ff;
    border-radius: 5px;
    border: none;
    font-size: 0.9rem;
    color: #fff;
    transition: 0.1s opacity ease-in;

    &:hover {
      opacity: 0.5;
    }

    &:active {
      opacity: 0.75;
      transition: none;
    }
  }
`;

export const email_regex =
  /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
export const phone_regex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

const ContactForm = () => {
  const [postEnquire] = usePostEnquireMutation();

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const resetInput = () => {
    setFirst('');
    setLast('');
    setEmail('');
    setphone('');
    setMessage('');
  };

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: Dispatch<SetStateAction<string>>,
    limit: number
  ) => {
    setError('');
    if (e.target.value.length > limit) {
      e.target.classList.add('wrong');
      return;
    }
    e.target.classList.remove('wrong');
    setState(e.target.value);
  };

  const onSubmitButton = async () => {
    if (!first) {
      if (firstRef.current) firstRef.current.classList.add('wrong');
      setError('Input your first name, please.');
      return;
    }

    if (!last) {
      if (lastRef.current) lastRef.current.classList.add('wrong');
      setError('Input your last name, please.');
      return;
    }

    if (!email_regex.test(email)) {
      if (emailRef.current) emailRef.current.classList.add('wrong');
      setError('Invalid email format.');
      return;
    }

    if (!phone_regex.test(phone)) {
      if (phoneRef.current) phoneRef.current.classList.add('wrong');
      setError('Invalid phone format');
      return;
    }

    if (!message) {
      if (messageRef.current) messageRef.current.classList.add('wrong');
      setError('Input your message, please.');
      return;
    }

    try {
      await postEnquire({ first, last, email, phone, message });
      resetInput();
      setAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormBox>
        <Box mb="15px">
          <input
            ref={firstRef}
            type="text"
            placeholder="First Name"
            spellCheck={false}
            value={first}
            onChange={(e) => onChangeInput(e, setFirst, 16)}
          />
          <input
            ref={lastRef}
            type="text"
            placeholder="Last Name"
            spellCheck={false}
            value={last}
            onChange={(e) => onChangeInput(e, setLast, 16)}
          />
        </Box>
        <Box mb="25px">
          <input
            ref={emailRef}
            type="text"
            placeholder="Email"
            spellCheck={false}
            value={email}
            onChange={(e) => onChangeInput(e, setEmail, 32)}
          />
          <input
            ref={phoneRef}
            type="text"
            placeholder="Phone"
            spellCheck={false}
            value={phone}
            onChange={(e) => onChangeInput(e, setphone, 16)}
          />
        </Box>
        <Box pb="15px" posit="relative">
          <textarea
            ref={messageRef}
            placeholder="Type your message here..."
            spellCheck={false}
            value={message}
            onChange={(e) => onChangeInput(e, setMessage, 500)}
          ></textarea>
          <div className="limit">
            <span className={`${message.length > 500 && 'red'}`}>
              [ {message.length} / 500 ]
            </span>
          </div>
        </Box>
        {error && (
          <Box className="error">
            <span>{error}</span>
          </Box>
        )}
        <Box mt="10px">
          <button className="submit" onClick={() => onSubmitButton()}>
            Submit
          </button>
        </Box>
        {alert && (
          <AlertBox>
            <div className="message">
              <span>
                Thank you for contacting us.
                <br />
              </span>
              <span>We will contact you soon.</span>
              <div>
                <button className="ok" onClick={() => setAlert(false)}>
                  OK
                </button>
              </div>
            </div>
          </AlertBox>
        )}
      </FormBox>
    </>
  );
};

export default ContactForm;
