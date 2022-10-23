import SignIn from './SignIn';
import SignUp from './SignUp';
import { useState } from 'react';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const handleSetIsSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <>
      {isSignIn ? <SignIn /> : <SignUp />}{' '}
      <h3 onClick={handleSetIsSignIn}>Уже есть аккаунт? Войти</h3>
    </>
  );
};

export default AuthPage;
