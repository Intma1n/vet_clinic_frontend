import { IAnimalItem } from './types';
import { FC, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { StyledAccordionSummary } from '../../../pages/clients/style';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import AnalysList from '../../AnalysList';
import {
  mockDiagnosis_Animal1,
  mockEmployees,
  mockTreatments_Animal1,
} from '../../../assets/mockData';
import ProcedureList from '../../ProcedureList';
import {
  addAnalysis,
  addProcedure,
  addTreatment,
  getAnalyses,
  getDiagnosis,
  getTreatment,
} from '../../../utils/api';

const AnimalItem: FC<IAnimalItem> = ({
  animal_id,
  animal_age,
  animal_sex,
  animal_breed,
  animal_name,
  animal_type,
}: IAnimalItem) => {
  const [treatment, setTreatment] = useState<any>(null);
  const [treatmentName, setTreatmentName] = useState<any>(null);
  const [diagnosys, setDiagnosys] = useState<any>(null);
  const [analys, setAnalys] = useState<any>(null);
  const [procedure, setProcedure] = useState<any>(null);
  const doctors = mockEmployees.filter((employee) => employee.position === 'doctor');

  useEffect(() => {
    getTreatment(animal_id).then((response) => setTreatment(response.data));
  }, [animal_id]);

  useEffect(() => {
    getDiagnosis(animal_id).then((response) => setDiagnosys(response.data));
  }, [animal_id]);

  const handleAddTreatment = () => {
    //@ts-ignore
    addTreatment(animal_id, treatmentName);
  };

  const handleAddAnalys = () => {
    addAnalysis(analys, +animal_id);
  };

  const handleAddProcedure = () => {
    addProcedure({ procedure_name: procedure }, animal_id);
  };

  const handleSetTreatmentName = (event: React.SyntheticEvent) => {
    //@ts-ignore
    setTreatmentName(event.target.value);
  };

  const handleSetAnalys = (event: React.SyntheticEvent) => {
    //@ts-ignore
    setAnalys(event.target.value);
  };

  const handleSetProcedure = (event: React.SyntheticEvent) => {
    //@ts-ignore
    setProcedure(event.target.value);
  };

  return (
    <Accordion>
      <StyledAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Typography>{animal_name + ' ' + animal_type}</Typography>
      </StyledAccordionSummary>
      <AccordionDetails>
        {/*<FormControl style={{ width: 300 }}>*/}
        {/*  <InputLabel>?????????????????? ??????????????</InputLabel>*/}
        {/*  <Select fullWidth label="???????????????? ??????">*/}
        {/*    {doctors.map((doctor) => (*/}
        {/*      <MenuItem value={doctor.employee_id}>*/}
        {/*        {doctor.firstname + ' ' + doctor.lastname}*/}
        {/*      </MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
        <Typography>{'????????????: ' + animal_breed}</Typography>
        {treatment &&
          treatment.treatment.map((elem: any) => (
            <Typography>{'?????????????? ' + elem.treatment_name}</Typography>
          ))}
        {diagnosys && <Typography>{'?????????????? ' + diagnosys}</Typography>}
        {localStorage.getItem('userType') === 'doctor' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FormControl>
              <TextField
                onChange={handleSetTreatmentName}
                id="standard-basic"
                label="?????????????????? ??????????????"
                variant="standard"
              />
              <Button
                onClick={handleAddTreatment}
                style={{ margin: 10, width: '10%' }}
                variant="contained"
              >
                ????????????????
              </Button>
            </FormControl>
            <FormControl>
              <TextField
                id="standard-basic"
                label="?????????????????? ??????????????"
                variant="standard"
              />
              <Button style={{ margin: 10, width: '10%' }} variant="contained">
                ????????????????
              </Button>
            </FormControl>
            <FormControl>
              <Select
                // @ts-ignore
                onChange={(e) => handleSetAnalys(e)}
                id="standard-basic"
                label="???????????????? ??????????????"
                variant="standard"
                placeholder="???????????????? ??????????????"
              >
                <MenuItem value="arterial blood">???????????????????????? ??????????</MenuItem>
                <MenuItem value="deoxygenated blood">?????????????????? ??????????</MenuItem>
              </Select>
              <Button
                onClick={handleAddAnalys}
                style={{ margin: 10, width: '10%' }}
                variant="contained"
              >
                ????????????????
              </Button>
            </FormControl>
            <FormControl>
              <Select
                //@ts-ignore
                onChange={(e) => handleSetProcedure(e)}
                id="standard-basic"
                label="???????????????? ??????????????????"
                variant="standard"
              >
                <MenuItem value="cleaning">????????????</MenuItem>
                <MenuItem value="trim">??????????????</MenuItem>
                <MenuItem value="bathing">???????????????? ??????????</MenuItem>
                <MenuItem value="hydromassage">??????????????????????</MenuItem>
              </Select>
              <Button
                onClick={handleAddProcedure}
                style={{ margin: 10, width: '10%' }}
                variant="contained"
              >
                ????????????????
              </Button>
            </FormControl>
          </div>
        )}
        <AnalysList animal_id={animal_id} />
        <ProcedureList animal_id={animal_id} />
      </AccordionDetails>
    </Accordion>
  );
};

export default AnimalItem;
