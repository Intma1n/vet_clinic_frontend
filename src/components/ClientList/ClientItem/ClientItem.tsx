import { Accordion, AccordionDetails, Typography } from '@mui/material';
import { StyledAccordionSummary } from '../../../pages/clients/style';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { IClientItem } from './types';
import { FC } from 'react';
import AnimalList from '../../AnimalList';

const ClientItem: FC<IClientItem> = ({ clientId, firstname, lastname }: IClientItem) => {
  // const getAnimalsForClient = (clientId: string) => {
  //   const clientAnimals = mockAnimals_Client_1.filter(
  //     (animal) => animal.clientId === clientId
  //   );
  //   return (
  //     <>
  //       {clientAnimals.map((animal) => (
  //         <Accordion>
  //           <StyledAccordionSummary
  //             expandIcon={<ArrowForwardIosSharpIcon />}
  //             aria-controls="panel1d-content"
  //             id="panel1d-header"
  //           >
  //             <Typography>
  //               {animal.animalInfo.animal_name + ' ' + animal.animalInfo.animal_type}
  //             </Typography>
  //           </StyledAccordionSummary>
  //           <AccordionDetails>
  //             <Typography>{'Возраст: ' + animal.animalInfo.animal_age}</Typography>
  //             <Typography>{'Порода: ' + animal.animalInfo.animal_breed}</Typography>
  //             <Typography>{'Пол: ' + animal.animalInfo.animal_sex}</Typography>
  //             <AnalysList />
  //           </AccordionDetails>
  //         </Accordion>
  //       ))}
  //     </>
  //   );
  // };
  return (
    <Accordion key={clientId}>
      <StyledAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Typography>{firstname + ' ' + lastname}</Typography>
      </StyledAccordionSummary>
      <AccordionDetails>
        <AnimalList client_id={clientId} />
      </AccordionDetails>
    </Accordion>
  );
};
export default ClientItem;
