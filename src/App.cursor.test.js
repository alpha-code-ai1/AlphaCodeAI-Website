import { fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/ui/CosmicBackground', () => () => null);

beforeEach(() => {
  window.localStorage.clear();
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: query.includes('(hover: hover)'),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }));
});

test('shows a genuinely multicolor cube cursor in the light experience', async () => {
  render(<App />);

  await waitFor(() => {
    expect(document.querySelector('[data-cursor-theme="light"]')).toBeInTheDocument();
  });

  const tileColors = new Set(
    Array.from(document.querySelectorAll('[data-cube-tile]')).map(
      (tile) => tile.dataset.cubeColor
    )
  );
  expect(tileColors.size).toBeGreaterThanOrEqual(5);
});

test('rotates the cube body in response to pointer movement', async () => {
  render(<App />);

  const cursor = await waitFor(() => {
    const element = document.querySelector('[data-cursor-theme="light"]');
    expect(element).toBeInTheDocument();
    return element;
  });
  const cubeBody = cursor.querySelector(':scope > div > div');
  const initialTransform = cubeBody.style.transform;

  fireEvent(
    window,
    new MouseEvent('pointermove', { clientX: 120, clientY: 160 })
  );
  fireEvent(
    window,
    new MouseEvent('pointermove', { clientX: 230, clientY: 90 })
  );

  await waitFor(() => {
    expect(cubeBody.style.transform).not.toBe(initialTransform);
  });
});
