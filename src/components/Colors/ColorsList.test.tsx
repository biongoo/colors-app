import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Color from '../../types/Color';
import ColorList from './ColorsList';

const predefinedColors: Color[] = [
  { id: 1, type: 'prepared', value: '#ffa3a3' },
  { id: 2, type: 'prepared', value: '#000000' },
  { id: 3, type: 'prepared', value: '#FFFFFF' },
  { id: 4, type: 'prepared', value: '#00FFFF' },
  { id: 5, type: 'prepared', value: '#FF00FF' },
  { id: 6, type: 'prepared', value: '#FFFF00' },
  { id: 7, type: 'prepared', value: '#0000FF' },
  { id: 8, type: 'prepared', value: '#00FF00' },
  { id: 9, type: 'prepared', value: '#FF0000' },
];

describe('ColorList component', () => {
  test('renders list of prepared colors', () => {
    render(<ColorList predefinedColors={predefinedColors} />);

    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(9);
  });

  test('red > 50% || green > 50% || blue > 50% || saturation > 50%', () => {
    render(<ColorList predefinedColors={predefinedColors} />);

    const redCheckbox = screen.getByText(/red > 50%/i);
    const greenCheckbox = screen.getByText(/green > 50%/i);
    const blueCheckbox = screen.getByText(/blue > 50%/i);
    const saturationCheckbox = screen.getByText(/saturation > 50%/i);

    userEvent.click(redCheckbox);
    let listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(5);
    userEvent.click(redCheckbox);

    userEvent.click(greenCheckbox);
    listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(5);
    userEvent.click(greenCheckbox);

    userEvent.click(blueCheckbox);
    listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(5);
    userEvent.click(blueCheckbox);

    userEvent.click(saturationCheckbox);
    listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(7);
    userEvent.click(saturationCheckbox);
  });

  test('red > 50% && green > 50% && blue > 50% && saturation > 50%', () => {
    render(<ColorList predefinedColors={predefinedColors} />);

    const redCheckbox = screen.getByText(/red > 50%/i);
    const greenCheckbox = screen.getByText(/green > 50%/i);
    const blueCheckbox = screen.getByText(/blue > 50%/i);
    const saturationCheckbox = screen.getByText(/saturation > 50%/i);

    userEvent.click(redCheckbox);
    userEvent.click(greenCheckbox);
    userEvent.click(blueCheckbox);
    userEvent.click(saturationCheckbox);

    let listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(1);
  });
});
