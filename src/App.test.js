import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/ui/CosmicBackground', () => () => null);
jest.mock('./components/ui/CursorGlow', () => () => null);

beforeEach(() => {
  window.localStorage.clear();
});

test('defaults to the light experience and can switch themes', async () => {
  render(<App />);

  const themeSwitch = screen.getByRole('switch', {
    name: /switch to dark experience/i
  });
  expect(themeSwitch).toHaveAttribute('aria-checked', 'true');

  await waitFor(() => {
    expect(
      screen.getByRole('heading', {
        name: /software with intelligence built in/i
      })
    ).toBeInTheDocument();
  });

  fireEvent.click(themeSwitch);

  await waitFor(() => {
    expect(themeSwitch).toHaveAttribute('aria-checked', 'false');
  });
  expect(window.localStorage.getItem('alphacodeai-theme')).toBe('dark');
});
