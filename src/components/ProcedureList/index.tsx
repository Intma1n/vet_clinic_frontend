import { IProceduresList } from './types';
import { FC, useEffect, useState } from 'react';
import { mockAnalyses_Animal1, mockProcedures_Animal_1 } from '../../assets/mockData';
import AnalysItem from '../AnalysList/AnalysItem';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { IProceduresItem } from './ProceduresItem/types';
import { getProcedures } from '../../utils/api';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;
import ProceduresItem from './ProceduresItem';

const ProcedureList: FC<IProceduresList> = ({ animal_id }) => {
  const [procedures, setProcedures] = useState<any>([]);

  useEffect(() => {
    getProcedures(animal_id)
      //@ts-ignore
      .then((response) => setProcedures(response))
      .catch((error) => console.log(error));
  }, [animal_id]);
  console.log(
    'mockAnalyses_Animal1.animal_id',
    mockProcedures_Animal_1.animal_id,
    'animal_id',
    animal_id
  );
  //@ts-ignore
  const proceduresArray =
    procedures.length > 0
      ? //@ts-ignore
        procedures.map((procedure) =>
          procedure.animal_id === animal_id ? (
            <ProceduresItem
              key={procedure.procedure_id}
              procedure_id={procedure.procedure_id}
              procedure_name={procedure.procedure_name}
              // @ts-ignore
              status={procedure.status}
            />
          ) : null
        )
      : null;
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Процедуры</Typography>
      </AccordionSummary>
      <AccordionDetails>{proceduresArray}</AccordionDetails>
    </Accordion>
  );
};

export default ProcedureList;
