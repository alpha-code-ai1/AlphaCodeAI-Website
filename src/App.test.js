import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/ui/CosmicBackground', () => () => null);
jest.mock('./components/ui/CursorGlow', () => () => null);

beforeEach(() => {
  window.localStorage.clear();
});

test('switches from the dark site to the rebuilt light experience', async () => {
  render(<App />);

  const themeSwitch = screen.getByRole('switch', {
    name: /switch to light experience/i
  });
  expect(themeSwitch).toHaveAttribute('aria-checked', 'false');

  fireEvent.click(themeSwitch);

  await waitFor(() => {
    expect(
      screen.getByRole('heading', {
        name: /software with intelligence built in/i
      })
    ).toBeInTheDocument();
  });

  expect(themeSwitch).toHaveAttribute('aria-checked', 'true');
  expect(window.localStorage.getItem('alphacodeai-theme')).toBe('light');
});
