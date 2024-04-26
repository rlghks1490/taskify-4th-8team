import * as S from './SignupForm.style';
import SignupInputs from '@/components/pages/signup/SignupInputs';
import TermsAgreement from '@/components/pages/signup/TermsAgreement';
import Button from '@/components/button/Button';
import { useForm } from 'react-hook-form';
import api from '@/pages/api/axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignupForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm({ mode: 'onBlur', defaultValues: { email: '', nickname: '', password: '', passwordCheck: '' } });

  const [isAgree, setIsAgree] = useState(false);
  const watchAllFileds = watch();
  const isAllFiledsEmpty = Object.values(watchAllFileds).some((value) => !value);
  const disabledCondition =
    !!errors.email || !!errors.nickname || !!errors.password || !!errors.passwordCheck || !isAgree || isAllFiledsEmpty;

  const signUp = async (data: object) => {
    try {
      const response = await api.post('/users/', data);
      if (response.status === 201) {
        alert('가입이 완료되었습니다.');
        const result = response.data;
        router.push('/login');
        return result;
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <S.Container onSubmit={handleSubmit(signUp)}>
      <SignupInputs register={register} errors={errors} getValues={getValues} />
      <TermsAgreement isAgree={isAgree} setIsAgree={setIsAgree} />
      <Button variant='signup' $width='52rem' $height='5rem' type='submit' disabled={disabledCondition}>
        가입하기
      </Button>
    </S.Container>
  );
};

export default SignupForm;