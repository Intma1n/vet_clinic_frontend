import { ISignUpProps } from './types';
import { FC } from 'react';
import SignUpForm from './components/SignUpForm';
import { StyledSignUpWrapper } from './style';

const SignUp: FC<ISignUpProps> = () => {
  return (
    <StyledSignUpWrapper>
      <SignUpForm />
    </StyledSignUpWrapper>
  );
};

export default SignUp;
