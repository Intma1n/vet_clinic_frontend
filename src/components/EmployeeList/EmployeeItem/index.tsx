import { IEmployeeItem } from './types';
import { FC, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { StyledAccordionSummary } from '../../../pages/clients/style';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AddEmployeeForm from '../../../pages/employees/AddEmployeeForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { mockEmployees } from '../../../assets/mockData';
import { addInternToDoctor, deleteEmployee } from '../../../utils/api';

const EmployeeItem: FC<IEmployeeItem> = ({
  firstname,
  lastname,
  salary,
  stage,
  age,
  position,
  phone_number,
  employee_id,
  document_id,
  employees,
}: IEmployeeItem) => {
  console.log(employees);
  //@ts-ignore
  const nurses = employees.filter((employee) => employee.position === 'intern');
  const [intern, setIntern] = useState<any>(null);

  const handleDelete = (employee_id: string) => {
    deleteEmployee(employee_id).then((data) => console.log(data.data));
  };

  const handleSetIntern = (event: React.SyntheticEvent) => {
    // @ts-ignore
    setIntern(event.target.value);
  };

  const handleAddInternToDoctor = () => {
    addInternToDoctor(intern, employee_id);
  };

  // @ts-ignore
  return (
    <Accordion key={employee_id}>
      <StyledAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Typography>{firstname + ' ' + lastname}</Typography>
      </StyledAccordionSummary>
      <AccordionDetails>
        {position === 'doctor' && localStorage.getItem('userType') === 'admin' && (
          <FormControl style={{ width: 300 }}>
            <InputLabel>Назначить интерна</InputLabel>

            <Select
              // @ts-ignore
              onChange={(e) => handleSetIntern(e)}
              fullWidth
              label="Наначить интерна"
            >
              {/*@ts-ignore*/}
              {nurses.map((nurse) => (
                <MenuItem value={nurse.employee_id}>
                  {nurse.first_name + ' ' + nurse.last_name}
                </MenuItem>
              ))}
            </Select>
            <Button onClick={handleAddInternToDoctor} variant="contained">
              назначить
            </Button>
          </FormControl>
        )}
        <Typography>{'Должность ' + position}</Typography>
        <Typography>{'Возраст ' + age}</Typography>
        <Typography>{'Стаж ' + stage}</Typography>
        <Typography>{'Номер телефона ' + phone_number}</Typography>
        <Typography>{'Номер документа ' + document_id}</Typography>
        <Typography>{'Зарплата ' + salary}</Typography>
        {localStorage.getItem('userType') === 'director' && position !== 'director' && (
          <Button
            onClick={() => handleDelete(employee_id)}
            style={{ marginTop: 10 }}
            variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
          >
            Удалить сотрудника
          </Button>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default EmployeeItem;
