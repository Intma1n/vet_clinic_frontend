import { SignInProps } from './types';
import { FC } from 'react';
import SignInForm from './components/SignInForm';
import { StyledSignInWrapper } from './style';

const SignIn: FC<SignInProps> = () => {
  return (
    <StyledSignInWrapper>
      <SignInForm />
    </StyledSignInWrapper>
  );
};

export default SignIn;
