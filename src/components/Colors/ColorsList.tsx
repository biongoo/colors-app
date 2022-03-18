import React, { useState, useEffect } from 'react';

import Box from '../UI/Box';
import Button from '../UI/Button';
import Color from '../../types/Color';
import Checkbox from '../UI/Checkbox';
import classes from './ColorList.module.scss';

const defaultCheckboxes = {
  red: false,
  green: false,
  blue: false,
  saturation: false,
};

type CheckboxesKey = keyof typeof defaultCheckboxes;

type RGB = {
  red: number;
  green: number;
  blue: number;
};

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

const calculateSaturationHSL = ({ red, green, blue }: RGB) => {
  const r = red / 255,
    g = green / 255,
    b = blue / 255;

  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;

  let s = 0,
    l = 0;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);

  return s;
};

const ColorsList: React.FC<Props> = ({ predefinedColors }) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [checkboxes, setCheckboxes] = useState(defaultCheckboxes);

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

  const removeColor = (id: number) => {
    const colorsParsed = localStorage.getItem('colors');
    const colors: Color[] = colorsParsed ? JSON.parse(colorsParsed) : [];

    const newColors = colors.filter((item) => item.id !== id);
    localStorage.setItem('colors', JSON.stringify(newColors));
    window.dispatchEvent(new Event('storage'));
  };

  const updateCheckbox = (type: CheckboxesKey) => {
    setCheckboxes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const concatedColors = colors
    .concat(predefinedColors)
    .map((i) => ({ ...i, value: i.value.toUpperCase() }));

  const filteredColors = concatedColors.filter((color) => {
    const longColor = convertShortHex(color.value);
    const red = parseInt(longColor.slice(1, 3), 16);
    const green = parseInt(longColor.slice(3, 5), 16);
    const blue = parseInt(longColor.slice(5, 7), 16);

    return !(
      (checkboxes.red && red <= 127) ||
      (checkboxes.green && green <= 127) ||
      (checkboxes.blue && blue <= 127) ||
      (checkboxes.saturation &&
        calculateSaturationHSL({ red, green, blue }) <= 50)
    );
  });

  filteredColors.sort(compareColors);

  return (
    <Box>
      <div className={classes.formBox}>
        <Checkbox
          id="red"
          label="Red > 50%"
          checked={checkboxes.red}
          onChange={updateCheckbox.bind(null, 'red')}
        />
        <Checkbox
          id="green"
          label="Green > 50%"
          checked={checkboxes.green}
          onChange={updateCheckbox.bind(null, 'green')}
        />
        <Checkbox
          id="blue"
          label="Blue > 50%"
          checked={checkboxes.blue}
          onChange={updateCheckbox.bind(null, 'blue')}
        />
        <Checkbox
          id="saturation"
          label="Saturation > 50%"
          checked={checkboxes.saturation}
          onChange={updateCheckbox.bind(null, 'saturation')}
        />
      </div>

      <ul className={classes.list}>
        {filteredColors.map((item) => {
          return (
            <li key={item.id}>
              {/* custom `data-*` attributes (attr() function) doesn't work on the newest version of css (only for content) */}
              <p style={{ '--color': item.value } as React.CSSProperties}>
                {item.value}
              </p>
              {item.type === 'added' && (
                <Button
                  type="button"
                  color="danger"
                  onClick={removeColor.bind(null, item.id)}
                >
                  X
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

export default ColorsList;
