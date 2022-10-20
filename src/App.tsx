import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { routes } from './utils/routes';
import SignIn from './pages/auth-page/SignIn';

function App() {
  return (
    <Routes>
      <Route path={routes.signIn} element={<SignIn />} />
    </Routes>
  );
}

export default App;
