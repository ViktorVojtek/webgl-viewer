import React from 'react';
import styled from 'styled-components';
import useStore from '../lib/store';

interface IProps {
  images?: string[];
  open?: boolean;
}
interface IMItemProps {
  amount?: number;
  image?: string;
}

const Wrapper = styled.div`
  display: ${({ open }: IProps) => (open ? 'block' : 'none')};
  position: absolute;
  bottom: 15%;
  width: 100%;
  pointer-events: none;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin: 0 auto;
  pointer-events: all;
`;

const MItem = styled.div`
  display: block;
  background-image: ${({ image }: IMItemProps) =>
    image ? `url(${image})` : null};
  background-position: center;
  border: 2px solid #fff;
  margin: 1rem 0;
  width: ${({ amount }) =>
    amount ? Math.round((window.innerWidth * 0.4) / amount) - 4 : 100}px;
  height: ${({ amount }) =>
    amount ? Math.round((window.innerWidth * 0.4) / amount) - 4 : 100}px;

  transition: transform 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default (props: IProps) => {
  const { images, open } = props;
  const [dispatch] = useStore((store) => [store.dispatch]);

  const handleMatClick = (idx: number) => {
    dispatch({ type: 'SET_MAT_IDX', payload: idx });
  };

  const matItems: JSX.Element | unknown = images
    ? images.map((item, i) => {
        return (
          <MItem
            amount={images.length > 2 ? images.length : 0}
            image={item}
            key={`mat-${i}`}
            onClick={() => handleMatClick(i)}
          />
        );
      })
    : null;

  return (
    <Wrapper open={open}>
      <Container>{matItems}</Container>
    </Wrapper>
  );
};
