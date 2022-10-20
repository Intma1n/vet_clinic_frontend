import { Button, FormControl, styled, TextField } from '@mui/material';

export const StyledSignInFormWrapper = styled('div')`
  width: 50%;
  display: flex;
  margin: auto;
  flex-direction: column;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const StyledSignInForm = styled('form')`
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
