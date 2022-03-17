import React, { useReducer } from 'react';

import Box from '../UI/Box';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Color from '../../types/Color';
import classes from './AddColor.module.scss';

enum ColorActionType {
  TOUCH = 'TOUCH',
  UPDATE = 'UPDATE',
}

type ColorState = {
  value: string;
  error: boolean;
  touched: boolean;
};

type ColorAction = {
  type: ColorActionType;
  payload: string;
};

const initialColorState: ColorState = {
  value: '',
  error: false,
  touched: false,
};

const colorReducer = (state: ColorState, action: ColorAction) => {
  const { type, payload } = action;
  const pattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

  switch (type) {
    case ColorActionType.UPDATE:
      return { ...state, value: payload, error: !payload.match(pattern) };
    case ColorActionType.TOUCH:
      return { ...state, touched: true, error: !state.value.match(pattern) };
    default:
      return state;
  }
};

const AddColor = () => {
  const [color, dispatchColor] = useReducer(colorReducer, initialColorState);

  const addColorHandler = (event: React.FormEvent) => {
    event.preventDefault();

    //Checking and parsing color in reducer
    if (color.error) return;

    const colorsParsed = localStorage.getItem('colors');
    const colors: Color[] = colorsParsed ? JSON.parse(colorsParsed) : [];

    colors.push({ type: 'added', value: color.value });
    localStorage.setItem('colors', JSON.stringify(colors));
  };

  const changeColorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const pattern = /^#[0-9a-fA-F]{0,6}$/;

    if (value === '') {
      dispatchColor({ type: ColorActionType.UPDATE, payload: '' });
    } else if (value.match(pattern)) {
      dispatchColor({ type: ColorActionType.UPDATE, payload: value });
    }
  };

  const touchColorHandler = () => {
    if (!color.touched) {
      dispatchColor({ type: ColorActionType.TOUCH, payload: '' });
    }
  };

  const error = color.error
    ? 'Invalid value! Should be like "#1212ab" or "#FFF"'
    : '';

  return (
    <Box>
      <form
        noValidate
        onSubmit={addColorHandler}
        className={classes.addColorForm}
      >
        <Input
          id="color"
          type="text"
          label="HEX RGB Color:"
          error={error}
          value={color.value}
          placeholder="e.g. #121212"
          onBlur={touchColorHandler}
          onChange={changeColorHandler}
        />
        <Button type="submit">Add color</Button>
      </form>
    </Box>
  );
};

export default AddColor;
