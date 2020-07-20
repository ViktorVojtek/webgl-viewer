import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const ArrowBtnContainer = styled.button`
  background-color: rgba(74, 74, 74, 0.75);
  border: 5px solid rgb(158, 157, 157);
  border-radius: 50%;
  color: #fff;
  display: ${({ el }: { direction?: string; el?: any }) =>
    el && el.current ? 'block' : 'none'};
  font-size: ${({ el }: { direction?: string; el?: any }) =>
    el && el.current
      ? `${Math.round((el.current.parentElement.offsetWidth * 4) / 100)}px`
      : 0};
  position: absolute;
  top: 30%;
  outline: none;
  ${({ direction }: { direction?: string; ref?: any }) =>
    direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  width: 10%;
  height: ${({ el }: { direction?: string; el?: any }) =>
    el && el.current
      ? `${Math.round(el.current.parentElement.offsetWidth * 0.1)}px`
      : '0'};
  ::after {
    content: ${({ direction }: { direction?: string; ref?: any }) =>
      direction === 'left' ? '"ᐸ"' : '"ᐳ"'};
    width: 10%;
  }
`;

export const ArrowBtn = (props: any) => {
  const { children } = props;
  const btn = useRef(null);

  useEffect(() => {
    return () => {};
  }, [window.innerWidth]);

  return (
    <ArrowBtnContainer ref={btn} el={btn} {...props}>
      {children}
    </ArrowBtnContainer>
  );
};

export const FormBtn = styled.button`
  padding: 0.75rem;
  border: 2px solid #232323;
  background-color: #fff;
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: ${({ show }: { show?: boolean }) => (show ? 'none' : 'block')};
`;

export const Wall = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  opacity: ${({ show }: { show?: boolean }) => (show ? 1 : 0)};
  pointer-events: none;
  transition: opacity 0.1s linear;
  z-index: 1;
`;

/* export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'left' | 'right';
}

const btnStyle = {
  backgroundColor: 'rgba(74, 74, 74, .75)',
  borderColor: 'rgb(158, 157, 157)',
  borderStyle: 'solid',
  borderWidth: 5,
  borderRadius: '50%',
  color: '#fff',
  position: 'absolute' as 'absolute',
  width: '10%',
  top: '30%',
  outline: 'none',
};
export function Button(props: ButtonProps): React.ReactElement<ButtonProps> {
  const { direction, ...rest } = props;
  const btn = useRef(null);
  const [style, setStyle] = useState(btnStyle);

  useEffect(() => {
    const resize = () => {
      const style = {
        ...btnStyle,
        fontSize: (btn.current.parentElement.offsetWidth * 7) / 100,
        height: btn.current.parentElement.offsetWidth * 0.1,
        left: direction && direction === 'left' ? 10 : 'unset',
        right: direction && direction === 'right' ? 10 : 'unset',
      };

      setStyle(style);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, [btn]);

  return (
    <button style={style} ref={btn} {...rest}>
      {direction && direction === 'left' ? '\u003C' : '\u003E'}
    </button>
  );
} */
