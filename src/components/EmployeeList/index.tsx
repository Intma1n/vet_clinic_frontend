import { mockEmployees } from '../../assets/mockData';
import EmployeeItem from './EmployeeItem';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { getEmployees } from '../../utils/api';
import { IEmployee } from '../../constants/commonInterfaces';

const EmployeeList = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data.data);
      console.log(data.data);
    });
  }, []);
  const employeeArray = employees.map((employee) => (
    <EmployeeItem
      employees={employees}
      key={employee.employee_id}
      stage={employee.stage}
      age={employee.age}
      document_id={employee.document_id}
      employee_id={employee.employee_id}
      //@ts-ignore
      firstname={employee.first_name}
      //@ts-ignore
      lastname={employee.last_name}
      phone_number={employee.phone_number}
      position={employee.position}
      salary={employee.salary}
    />
  ));
  return <Container>{employeeArray}</Container>;
};

export default EmployeeList;
