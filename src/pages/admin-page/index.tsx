import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <>
      <h1>AdminPage</h1>
      <Outlet />
    </>
  );
};

export default AdminPage;
