import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { mockEmployees } from '../../../../assets/mockData';
import { addComment } from '../../../../utils/api';
import { useState } from 'react';

const AddCommentForm = () => {
  const [comment, setComment] = useState<string>('');
  const handleAddComment = () => {
    addComment(comment);
  };

  const handleSetComment = (event: React.SyntheticEvent) => {
    //@ts-ignore
    setComment(event.target.value);
  };
  return (
    <form style={{ margin: 20, width: '80%' }} action="">
      <FormControl style={{ margin: 20, width: '80%' }}>
        <InputLabel>Оставить отзыв</InputLabel>
        <OutlinedInput onChange={(e) => handleSetComment(e)} label="Оставить отзыв" />
        <Button style={{ width: '30%', margin:10 }} onClick={handleAddComment} variant="contained">
          Оставить отзыв
        </Button>
      </FormControl>
    </form>
  );
};

export default AddCommentForm;
