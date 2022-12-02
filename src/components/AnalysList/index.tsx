import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from '@mui/material';
import AnalysItem from './AnalysItem';
import { IAnalysList } from './types';
import { FC, useEffect, useState } from 'react';
import { getAnalyses } from '../../utils/api';
import { Simulate } from 'react-dom/test-utils';

const AnalysList: FC<IAnalysList> = ({ animal_id }) => {
  const [analyses, setAnalyses] = useState<any>([]);

  useEffect(() => {
    getAnalyses(animal_id)
      .then((response) => {
        setAnalyses(response.data.analyses);
        console.log(
          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
          response.data.analyses
        );
      })
      .catch((error) => console.log(error));
  }, [animal_id]);
  //@ts-ignore
  const analysArray =
    analyses && analyses.length > 0
      ? //@ts-ignore
        analyses.map((analys) => (
          <AnalysItem
            key={analys.analyses_id}
            analyses_id={analys.analyses_id}
            analyses_name={analys.analyses_name}
            // @ts-ignore
            status={analys.status}
          />
        ))
      : null;
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Анализы</Typography>
      </AccordionSummary>
      <AccordionDetails>{analysArray}</AccordionDetails>
    </Accordion>
  );
};

export default AnalysList;
