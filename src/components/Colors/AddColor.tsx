import React, { useReducer } from 'react';

import Box from '../UI/Box';
import Input from '../UI/Input';
import Button from '../UI/Button';
import Color from '../../types/Color';
import classes from './AddColor.module.scss';

enum ColorActionType {
  TOUCH = 'TOUCH',
  RESET = 'RESET',
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

const initialColorState = {
  value: '',
  error: false,
  touched: false,
};

const colorReducer = (state: ColorState, action: ColorAction) => {
  const { type, payload } = action;
  const pattern = /^#(?:[0-9a-f]{3}){1,2}$/i;

  switch (type) {
    case ColorActionType.UPDATE:
      return { ...state, value: payload, error: !payload.match(pattern) };
    case ColorActionType.TOUCH:
      return { ...state, touched: true, error: !state.value.match(pattern) };
    case ColorActionType.RESET:
      return { ...initialColorState };
    default:
      return state;
  }
};

const AddColor = () => {
  const [color, dispatchColor] = useReducer(colorReducer, {
    ...initialColorState,
  });

  const addColorHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // Checking and parsing color in reducer
    if (color.error) return;

    const colorsParsed = localStorage.getItem('colors');
    const colors: Color[] = colorsParsed ? JSON.parse(colorsParsed) : [];

    // Not the best option with id, but sufficient for this application
    colors.push({ id: Math.random(), type: 'added', value: color.value });

    localStorage.setItem('colors', JSON.stringify(colors));
    window.dispatchEvent(new Event('storage'));

    dispatchColor({ type: ColorActionType.RESET, payload: '' });
  };

  const changeColorHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const pattern = /^#[0-9a-f]{0,6}$/i;

    if (!value) {
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

  const error =
    color.error && color.touched
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
