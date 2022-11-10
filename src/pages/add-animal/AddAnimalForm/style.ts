import { Button, FormControl, Select, styled, TextField } from '@mui/material';
import { Colors } from '../../../assets/colors';

export const StyledAddEmployeeFormWrapper = styled('div')`
  display: flex;
  margin: auto;
  flex-direction: column;
  right: 0;
  left: 0;
  width: 50%;
  align-items: center;
  justify-content: center;
  a {
    color: ${Colors.DARK_BLUE};
    text-decoration: none;
    :active {
      color: ${Colors.BLUE};
    }
  }
`;

export const StyledAddEmployeeForm = styled('form')`
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled(TextField)`
  margin: 10px;
  width: 50%;
  height: auto;
`;

export const StyledButton = styled(Button)`
  margin: auto;
  width: 20%;
  justify-content: center;
  text-transform: none;
`;

export const StyledFormHeaderText = styled('h1')`
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const StyledSelect = styled(Select)`
  margin: 10px;
  width: 50%;
  height: auto;
`;

export const StyledSelectFormControl = styled(FormControl)`
  margin: 10px;
  width: 50%;
  height: auto;
`;
