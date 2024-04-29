import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('App component', () => {
  let mock;

  beforeEach(() => {
    // Set up our mock for Axios
    mock = new MockAdapter(axios);
  });

  it('updates input value on change', () => {
    render(<App />);
    const input = screen.getByDisplayValue('');

    fireEvent.change(input, { target: { value: 'hello' } });

    expect(input.value).toBe('hello');
  });

  it('fetches and displays autocomplete suggestions', async () => {
    const suggestions = ['hello', 'helium', 'help'];

    // Mocking the Axios request to return our suggestions
    mock.onPost('http://localhost:5000').reply(200, suggestions);

    render(<App />);
    const input = screen.getByDisplayValue('');

    fireEvent.change(input, { target: { value: 'hel' } });

    // Wait for the suggestions to appear and check if they are rendered
    for (const suggestion of suggestions) {
      expect(await screen.findByText(suggestion)).toBeInTheDocument();
    }
  });

  it('selects an autocomplete suggestion', async () => {
    const suggestions = ['hello'];

    // Mocking the Axios request to return a single suggestion
    mock.onPost('http://localhost:5000').reply(200, suggestions);

    render(<App />);
    const input = screen.getByDisplayValue('');

    fireEvent.change(input, { target: { value: 'hel' } });

    // Click on the suggestion and verify input value changes
    const suggestionItem = await screen.findByText('hello');
    fireEvent.click(suggestionItem);

    expect(input.value).toBe('hello');
  });

  // More tests can be added as needed
});
