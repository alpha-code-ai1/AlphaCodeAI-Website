import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/ui/CosmicBackground', () => () => null);
jest.mock('./components/ui/CursorGlow', () => () => null);

beforeEach(() => {
  window.localStorage.clear();
});

test('defaults to the light experience and can switch themes', async () => {
  window.localStorage.setItem('alphacodeai-theme', 'dark');
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

test('moves the mascot gaze and keeps the last touch position', async () => {
  render(<App />);

  const mascot = await screen.findByRole('img', {
    name: /friendly alphacodeai robot/i
  });
  const eyes = mascot.querySelector('.light-mascot__eyes');

  Object.defineProperty(mascot, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      top: 0,
      right: 600,
      bottom: 500,
      left: 0,
      width: 600,
      height: 500
    })
  });

  fireEvent.touchMove(window, {
    touches: [{ clientX: 1000, clientY: 120 }]
  });

  await waitFor(() => {
    expect(eyes.style.transform).not.toBe('translate(0px, 0px)');
  });

  fireEvent.touchEnd(window, {
    changedTouches: [{ clientX: 1000, clientY: 120 }]
  });
  fireEvent.pointerLeave(document.documentElement);

  await waitFor(() => {
    const horizontalOffset = Number(
      eyes.style.transform.match(/translate\(([-\d.]+)px/)?.[1]
    );
    expect(horizontalOffset).toBeGreaterThan(20);
  });
});

test('routes requests through the interactive AI pachinko', async () => {
  render(<App />);

  const pachinko = await screen.findByRole('button', {
    name: /current destination: rag/i
  });
  fireEvent.click(pachinko);

  expect(
    screen.getByRole('button', { name: /current destination: llm/i })
  ).toBeInTheDocument();
});
