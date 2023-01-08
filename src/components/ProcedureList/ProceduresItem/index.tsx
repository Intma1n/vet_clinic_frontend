import { Button, Typography } from '@mui/material';
import { IProceduresItem } from './types';
import { FC } from 'react';
import { patchAnalys, patchProcedure } from '../../../utils/api';

const ProceduresItem: FC<IProceduresItem> = ({
  procedure_id,
  procedure_name,
  status,
}) => {
  const handlePatchProcedure = () => {
    patchProcedure(0, procedure_id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>{procedure_name}</Typography>
      <Typography style={{ color: +status === 1 ? 'red' : 'green' }}>
        {+status === 1 ? 'Назначено' : 'Проведено'}
      </Typography>
      {+status === 1 && localStorage.getItem('userType') === 'intern' && (
        <Button onClick={handlePatchProcedure} style={{ width: 300 }} variant="outlined">
          Провести процедуру
        </Button>
      )}
    </div>
  );
};

export default ProceduresItem;
