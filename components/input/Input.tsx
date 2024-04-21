import React, { InputHTMLAttributes, useRef, useState, useCallback, forwardRef, Ref } from 'react';
import * as S from './Input.style';
import { EyeOff, EyeOn } from '../Icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  errorMsg?: string;
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ id, type = 'text', placeholder, errorMsg, label, ...props }, ref) {
  const [isPassword, setIsPassword] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const toggleEyesButton = () => {
    if (passwordRef.current) {
      if (isPassword) {
        passwordRef.current.type = 'text';
        setIsPassword(false);
      } else {
        passwordRef.current.type = 'password';
        setIsPassword(true);
      }
    }
  };

  const handleRef: React.RefCallback<HTMLInputElement> = useCallback(
    (element) => {
      passwordRef.current = element;

      if (ref) {
        if (typeof ref === 'function') {
          ref(element);
        } else {
          ref.current = element;
        }
      }
    },
    [ref]
  );

  return (
    <>
      <S.Container>
        <S.Label htmlFor={id}>{label}</S.Label>
        <S.Input id={id} type={type} placeholder={placeholder} ref={handleRef} $error={!!errorMsg} {...props} />
        {type === 'password' && (
          <S.ImgPosition onClick={toggleEyesButton}>
            {isPassword ? <EyeOff $width={'2.4rem'} $height={'2.4rem'} /> : <EyeOn $width={'2.4rem'} $height={'2.4rem'} />}
          </S.ImgPosition>
        )}
      </S.Container>
      {errorMsg && <S.ErrorMessage>{errorMsg}</S.ErrorMessage>}
    </>
  );
});

export default Input;
