import { Typography } from '@mui/material';
import { IProceduresItem } from './types';
import { FC } from 'react';

const ProceduresItem: FC<IProceduresItem> = ({
  procedure_id,
  procedure_name,
  status,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>{procedure_name}</Typography>
      <Typography style={{ color: status === 'appointed' ? 'red' : 'green' }}>
        {status === 'appointed' ? 'Назначено' : 'Проведено'}
      </Typography>
    </div>
  );
};

export default ProceduresItem;
