import {Accordion, AccordionSummary, styled} from '@mui/material';

export const StyledAccordionSummary = styled(AccordionSummary)`
  & .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(90deg);
  }
`;
