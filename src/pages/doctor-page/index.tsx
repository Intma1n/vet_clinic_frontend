import {Outlet} from "react-router-dom";

const DoctorPage = () => {
  return (
    <>
      <h1>Doctor Page</h1>
      <Outlet/>
    </>
  );
};

export default DoctorPage;
