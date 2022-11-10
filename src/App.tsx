import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { routes } from './constants/routes';
import SignIn from './pages/auth-page/SignIn';
import SignUp from './pages/auth-page/SignUp';
import Main from './pages/main';
import AdminPage from './pages/admin-page';
import DirectorPage from './pages/director-page';
import ClientPage from './pages/client-page';
import NursePage from './pages/nurse-page';
import DoctorPage from './pages/doctor-page';
import Clients from './pages/clients';
import Employees from './pages/employees';
import AddClient from './pages/add-client';
import UpdateEmployee from './pages/update-employee';
import AddEmployee from './pages/add-employee';
import AddAnimal from './pages/add-animal';
import ClinicComments from './pages/clinic-comments';

function App() {
  return (
    <Routes>
      <Route path={routes.signIn} element={<SignIn />} />
      <Route path={routes.signUp} element={<SignUp />} />
      <Route element={<Main />} path={routes.main}>
        <Route path={routes.adminPage} element={<AdminPage />}>
          <Route path={routes.addAnimal} element={<AddAnimal />} />
          <Route path={routes.addClient} element={<AddClient />} />
          <Route path={routes.clients} element={<Clients />} />
          <Route path={routes.employees} element={<Employees />} />
        </Route>
        <Route path={routes.directorPage} element={<DirectorPage />}>
          <Route path={routes.clients} element={<Clients />} />
          <Route path={routes.employees} element={<Employees />} />
          <Route path={routes.updateEmployee} element={<UpdateEmployee />} />
          <Route path={routes.addEmployee} element={<AddEmployee />} />
          <Route path={routes.clinicCommentPage} element={<ClinicComments />} />
        </Route>
        <Route path={routes.doctorPage} element={<DoctorPage />}>
          <Route path={routes.clients} element={<Clients />} />
        </Route>
        <Route path={routes.nursePage} element={<NursePage />}>
          <Route path={routes.clients} element={<Clients />} />
        </Route>
        <Route path={routes.clientPage} element={<ClientPage />}>
          <Route path={routes.employees} element={<Employees />} />
          <Route path={routes.addAnimal} element={<AddAnimal />} />
          <Route path={routes.clinicCommentPage} element={<ClinicComments />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to={routes.signIn} />} />
    </Routes>
  );
}

export default App;
