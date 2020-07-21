import React from 'react';

import styled from 'styled-components';

const FormWrapper = styled.div`
  display: ${({ show }: { show: boolean }) => (show ? 'block' : 'none')};
  background-color: rgba(255, 255, 255, 0.9);
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  padding: 0.75rem 1rem;
  width: 100%;
  height: 100%;
  z-index: 2;
`;
const Form = styled.form`
  width: 50%;
  margin-left: 50%;
`;
const FormControl = styled.div`
  margin-bottom: 1.25rem;
`;
const H3 = styled.h3`
  font-family: sans-serif;
  font-weight: 200;
`;
const Input = styled.input`
  padding: 0.75rem 0.5rem;
  width: 80%;
`;
const TextArea = styled.textarea`
  padding: 0.75rem 0.5rem;
  width: 80%;
`;
const P = styled.p`
  font-family: sans-serif;
  font-weight: 200;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2.5rem;
  width: 0px;
  border: 0 none;
  background: transparent;
  font-size: 1.5rem;
  ::after {
    content: '×';
  }
`;
const Img = styled.img`
  width: 150px;
  display: block;
  float: left;
`;
const SubmitBtn = styled.button`
  width: 80%;
  text-align: center;
  background-color: #3498db;
  border: 0 none;
  padding: 1rem;
  border-radius: 0.25rem;
  color: #fff;
  :disabled {
    background-color: #1c608e;
    color: #dadada;
  }
`;

const Logo = styled.img`
  position: absolute;
  top: 40%;
  left: 5%;
`;

interface IProps {
  images?: string[];
  product?: any;
  show?: boolean;
  toggle?: () => void;
}

export default (props: IProps): JSX.Element => {
  const {
    images,
    product: { title },
    show,
    toggle,
  } = props;

  return (
    <FormWrapper show={show}>
      <CloseBtn onClick={toggle} />
      <Logo src='https://www.javorina.sk/assets/images/javorina-logotype.svg' />
      <Form>
        <H3>Nezáväzná objednávka</H3>
        <FormControl>
          <Input type='text' id='name' placeholder='Zadajte svoje meno' />
        </FormControl>
        <FormControl>
          <Input type='text' id='surname' placeholder='Zadajte priezvisko' />
        </FormControl>
        <FormControl>
          <Input type='text' id='email' placeholder='Zadajte svoj e-mail' />
        </FormControl>
        <FormControl>
          <TextArea id='message' placeholder='Napíšte nám správu...' rows={3} />
        </FormControl>
        <H3>Objednaný produkt:</H3>
        <P>{title}</P>
        {images && images.length > 0
          ? images.map((item, i) => <Img src={item} key={`img-${i}`} />)
          : null}
        <SubmitBtn type='submit' disabled>
          Odoslať objednávku
        </SubmitBtn>
      </Form>
    </FormWrapper>
  );
};
