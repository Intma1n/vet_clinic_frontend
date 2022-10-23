import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { routes } from './utils/routes';
import SignIn from './pages/auth-page/SignIn';
import SignUp from "./pages/auth-page/SignUp";

function App() {
  return (
    <Routes>
      <Route path={routes.signIn} element={<SignIn />} />
      <Route path={routes.signUp} element={<SignUp />} />
    </Routes>
  );
}

export default App;
