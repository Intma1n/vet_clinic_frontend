import { Outlet } from 'react-router-dom';

const ClientPage = () => {
  return (
    <>
      <h1>Client Page</h1>
      <Outlet />
    </>
  );
};

export default ClientPage;
