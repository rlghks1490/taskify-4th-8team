import * as S from '../../pages/mypage.style';
import Input from '@/components/input/Input';
import { inputProps } from '@/pages/myPage';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProfilePasswordBox = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
    watch,
  } = useForm({ mode: 'onChange', defaultValues: { password: '', passwordCheck: '' } });

  useEffect(() => {
    if (watch('password') !== watch('passwordCheck') && watch('passwordCheck')) {
      setError('passwordCheck', {
        type: 'password-mismatch',
        message: '비밀번호가 일치하지 않습니다',
      });
    } else {
      clearErrors('passwordCheck');
    }
  }, [watch('password'), watch('passwordCheck')]);
  return (
    <S.myPagePasswordBox>
      <h2>비밀번호 변경</h2>
      <S.myPageProfilePasswordInputBox>
        <Input label='현재 비밀번호' {...inputProps} type='password' placeholder='현재 비밀번호 입력' />
        <Input
          id='password'
          label='새 비밀번호'
          {...inputProps}
          type='password'
          placeholder='새 비밀번호 입력'
          {...register('password', { required: { value: true, message: '비밀번호가 일치하지 않습니다.' } })}
        />
        <Input
          id='passwordCheck'
          label='새 비밀번호 확인'
          {...inputProps}
          type='password'
          placeholder='새 비밀번호 입력'
          {...register('passwordCheck', {
            required: { value: true, message: '비밀번호가 일치하지 않습니다.' },
            validate: (value) => value === getValues('password') || '비밀번호가 일치하지 않습니다',
          })}
          errorMsg={errors.passwordCheck ? errors.passwordCheck.message : ''}
        />
      </S.myPageProfilePasswordInputBox>
      <S.passwordButton type='submit' isActive={isValid}>
        변경
      </S.passwordButton>
    </S.myPagePasswordBox>
  );
};
export default ProfilePasswordBox;