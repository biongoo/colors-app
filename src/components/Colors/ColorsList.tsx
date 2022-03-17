import React, { useState, useEffect } from 'react';

import Box from '../UI/Box';
import Color from '../../types/Color';
import classes from './ColorList.module.scss';

type Props = {
  predefinedColors: Color[];
};

const convertShortHex = (hex: string) => {
  return hex.length === 4
    ? '#' +
        hex
          .slice(1)
          .split('')
          .map((xx) => xx + xx)
          .join('')
    : hex;
};

const compareColors = (a: Color, b: Color) => {
  const longA = convertShortHex(a.value);
  const longB = convertShortHex(b.value);

  return longA < longB ? 1 : longA > longB ? -1 : 0;
};

const ColorsList: React.FC<Props> = ({ predefinedColors }) => {
  const [colors, setColors] = useState<Color[]>([]);

  useEffect(() => {
    const updateColors = () => {
      const colorsParsed = localStorage.getItem('colors');
      const colors: Color[] = colorsParsed ? JSON.parse(colorsParsed) : [];

      setColors(colors);
    };

    updateColors();
    window.addEventListener('storage', updateColors);

    return () => {
      window.removeEventListener('storage', updateColors);
    };
  }, []);

  const concatedColors = colors
    .concat(predefinedColors)
    .map((i) => ({ ...i, value: i.value.toUpperCase() }));

  concatedColors.sort(compareColors);

  console.log(concatedColors, Math.random());

  return (
    <Box>
      <ul className={classes.list}>
        {concatedColors.map((item) => {
          return <li key={item.id}>{item.value}</li>;
        })}
      </ul>
    </Box>
  );
};

export default ColorsList;
