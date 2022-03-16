import React, { useState } from 'react';

import Box from '../UI/Box';
import Input from '../UI/Input';

const AddColor = () => {
  const [color, setColor] = useState('');

  const changeColorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  return (
    <Box>
      <Input
        id="color"
        type="text"
        label="Color:"
        value={color}
        onChange={changeColorHandler}
      />
    </Box>
  );
};

export default AddColor;
