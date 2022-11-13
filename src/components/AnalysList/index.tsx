import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from '@mui/material';
import { mockAnalyses_Animal1 } from '../../assets/mockData';
import AnalysItem from './AnalysItem';
import { IAnalysList } from './types';
import { FC, useEffect, useState } from 'react';
import { getAnalyses } from '../../utils/api';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

const AnalysList: FC<IAnalysList> = ({ animal_id }) => {
  const [analyses, setAnalyses] = useState<any>([]);

  useEffect(() => {
    getAnalyses(animal_id)
      .then((response) => {
        setAnalyses(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [animal_id]);
  //@ts-ignore
  // const analysArray =
  //   analyses && analyses.length > 0
  //     ? //@ts-ignore
  //       analyses.map((analys) =>
  //         analys.animal_id === animal_id ? (
  //           <AnalysItem
  //             key={analys.analyses_id}
  //             analyses_id={analys.analyses_id}
  //             analyses_name={analys.analyses_name}
  //             // @ts-ignore
  //             status={analys.status}
  //           />
  //         ) : null
  //       )
  //     : null;
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Анализы</Typography>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default AnalysList;
