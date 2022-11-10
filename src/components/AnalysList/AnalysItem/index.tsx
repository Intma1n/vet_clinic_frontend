import { IAnalysItem } from './types';
import { FC } from 'react';
import { Button, Typography } from '@mui/material';

const AnalysItem: FC<IAnalysItem> = ({
  analyses_id,
  analyses_name,
  status,
}: IAnalysItem) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>{analyses_name}</Typography>
      <Typography style={{ color: status === 'appointed' ? 'red' : 'green' }}>
        {status === 'appointed' ? 'Назначено' : 'Проведено'}
      </Typography>
      {status == 'appointed' && (
        <Button style={{ width: 200 }} variant="outlined">
          Провести анализы
        </Button>
      )}
    </div>
  );
};

export default AnalysItem;
