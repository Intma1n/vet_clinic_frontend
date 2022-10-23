import {
  Button,
  FormControl,
  Select,
  styled,
  TextField,
} from '@mui/material';
import {Colors} from "../../../../../assets/colors";

export const StyledSignUpFormWrapper = styled('div')`
  width: 50%;
  display: flex;
  margin: auto;
  flex-direction: column;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  a {
    color:${Colors.DARK_BLUE};
    text-decoration: none;
    :active {
      color: ${Colors.BLUE};
    }
  }
`;

export const StyledSignUpForm = styled('form')`
  display: flex;
  flex-direction: column;
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
