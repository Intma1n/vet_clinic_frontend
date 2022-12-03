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
      <Typography style={{ color: +status === 1 ? 'red' : 'green' }}>
        {+status === 1 ? 'Назначено' : 'Проведено'}
      </Typography>
    </div>
  );
};

export default ProceduresItem;
