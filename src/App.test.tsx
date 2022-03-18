import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  test('add wrong value', () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /add color/i });

    userEvent.type(input, '#AbcD');
    userEvent.click(submitButton);

    const inputValue = screen.queryByText(/#AbcD/i);

    expect(inputValue).toBeNull();
  });

  test('add correct value and delete it', () => {
    render(<App />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /add color/i });

    userEvent.type(input, '#AbcD14');
    userEvent.click(submitButton);

    const addedValue = screen.queryByText(/#AbcD14/i);
    expect(addedValue).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /x/i });
    userEvent.click(deleteButton);

    const deletedValue = screen.queryByText(/#AbcD14/i);
    expect(deletedValue).toBeNull();
  });
});
