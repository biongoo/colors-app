import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddColor from './AddColor';

describe('AddColor component', () => {
  test('renders "HEX RGB Color"', () => {
    render(<AddColor />);

    const labelElement = screen.getByText(/hex rgb color:/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('not render error text for input when nothing happened', () => {
    render(<AddColor />);

    const textElement = screen.queryByText(
      /invalid value! should be like "#1212ab" or "#fff"/i
    );
    expect(textElement).toBeNull();
  });

  test('render error text for input when touched input', () => {
    render(<AddColor />);

    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.tab();

    const textElement = screen.getByText(
      /invalid value! should be like "#1212ab" or "#fff"/i
    );
    expect(textElement).toBeInTheDocument();
  });

  test('forbidden type something other than # as first character', () => {
    render(<AddColor />);

    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.type(input, 'qwertyuiopasdfghjkl;zxcvbnm,.14#');

    const inputValue = screen.getByDisplayValue(/^#$/);
    expect(inputValue).toBeInTheDocument();
  });

  test('input valid value and disappear error', () => {
    render(<AddColor />);

    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.tab();

    const textElement = screen.getByText(
      /invalid value! should be like "#1212ab" or "#fff"/i
    );
    expect(textElement).toBeInTheDocument();

    userEvent.type(input, '#123FFF');

    const inputValue = screen.getByDisplayValue(/^#123FFF$/);
    expect(inputValue).toBeInTheDocument();
  });

  test('paste short hex value', () => {
    render(<AddColor />);

    const input = screen.getByRole('textbox');
    userEvent.type(input, '#Abc');

    const inputValue = screen.getByDisplayValue(/^#Abc$/);
    expect(inputValue).toBeInTheDocument();
  });
});
