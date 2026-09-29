import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
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

test('shows the cybernetic guide only in the dark experience', async () => {
  render(<App />);

  expect(
    screen.queryByRole('img', { name: /alphacodeai cybernetic guide/i })
  ).not.toBeInTheDocument();

  fireEvent.click(
    screen.getByRole('switch', { name: /switch to dark experience/i })
  );

  expect(
    await screen.findByRole('img', { name: /alphacodeai cybernetic guide/i })
  ).toBeInTheDocument();
  expect(screen.queryByText(/cursor \/ scan/i)).not.toBeInTheDocument();
});

test('scrubs the cybernetic guide frames using horizontal pointer position', async () => {
  render(<App />);
  fireEvent.click(
    screen.getByRole('switch', { name: /switch to dark experience/i })
  );

  const guide = await screen.findByRole('img', {
    name: /alphacodeai cybernetic guide/i
  });
  const cursorMedia = guide.querySelector('[data-cursor-media]');

  fireEvent(
    window,
    new MouseEvent('mousemove', { clientX: window.innerWidth, clientY: 130 })
  );

  await waitFor(() => {
    expect(Number(cursorMedia.dataset.frame)).toBe(96);
  });
});

test('keeps the light experience sections and copy in the dark theme', async () => {
  render(<App />);
  fireEvent.click(
    screen.getByRole('switch', { name: /switch to dark experience/i })
  );

  expect(
    await screen.findByRole('heading', {
      name: /software with intelligence built in/i
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      name: /one team from first question to final release/i
    })
  ).toBeInTheDocument();
  expect(screen.getByRole('region', { name: /selected clients/i })).toBeInTheDocument();
  expect(screen.getAllByRole('group', { name: /case study chapter/i })).toHaveLength(2);
  expect(
    screen.queryByRole('img', { name: /friendly alphacodeai robot/i })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole('img', {
      name: /modular cobalt and orange ai production system/i
    })
  ).toHaveAttribute('src', expect.stringContaining('capabilities-workbench-dark.webp'));
  expect(
    screen.getByRole('img', {
      name: /property inspector using a thermal camera/i
    })
  ).toHaveAttribute('src', expect.stringContaining('case-proofit-dark.webp'));
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

test('shows the mascot warning, dead face, and three-second recovery message', () => {
  jest.useFakeTimers();
  const { unmount } = render(<App />);
  const mascot = screen.getByRole('img', {
    name: /friendly alphacodeai robot/i
  });

  expect(screen.getByRole('status')).toHaveTextContent('DONT CLICK ME >.<');
  fireEvent.click(mascot);

  expect(mascot).toHaveClass('is-dead');
  expect(screen.getByRole('status')).toHaveTextContent('OH NO');

  act(() => jest.advanceTimersByTime(3000));

  expect(mascot).not.toHaveClass('is-dead');
  expect(screen.getByRole('status')).toHaveTextContent('HEHE JUST KIDDING!');
  unmount();
  jest.useRealTimers();
});

test('renders distinct capability simulations and produces a tuned model result', async () => {
  render(<App />);

  expect(
    await screen.findByRole('button', { name: /pachinko routing simulation/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add ball/i })).toBeInTheDocument();
  const sorterButton = screen.getByRole('button', { name: /sort random batch/i });
  expect(sorterButton).toBeInTheDocument();
  expect(screen.getByRole('slider', { name: /model temperature/i })).toBeInTheDocument();
  const clawButton = screen.getByRole('button', { name: /drop claw/i });
  expect(clawButton).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /move claw left/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /move claw right/i })).toBeInTheDocument();

  fireEvent.click(sorterButton);
  expect(screen.getByRole('button', { name: /sorting/i })).toBeDisabled();

  fireEvent.click(clawButton);
  expect(screen.getByText(/claw descending/i)).toBeInTheDocument();

  const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.9);
  fireEvent.click(screen.getByRole('button', { name: /run inference/i }));

  expect(screen.getByText('Adaptive')).toBeInTheDocument();
  randomSpy.mockRestore();
});

test('groups desktop capability and case-study chapters into pairs', async () => {
  render(<App />);

  await screen.findByRole('heading', {
    name: /one team from first question to final release/i
  });

  const capabilityChapters = screen.getAllByRole('group', {
    name: /capability chapter \d of 2/i
  });
  expect(capabilityChapters).toHaveLength(2);
  capabilityChapters.forEach((chapter) => {
    expect(chapter.querySelectorAll('article')).toHaveLength(2);
  });

  const caseStudyChapters = screen.getAllByRole('group', {
    name: /case study chapter \d of 2/i
  });
  expect(caseStudyChapters).toHaveLength(2);
  caseStudyChapters.forEach((chapter) => {
    expect(chapter.querySelectorAll('article')).toHaveLength(2);
  });
});

test('maps desktop page scroll to partner carousel progress', async () => {
  render(<App />);

  const track = await screen.findByRole('region', { name: /selected clients/i });
  const section = track.closest('.light-partners');
  const progress = screen.getByRole('progressbar', {
    name: /partner carousel progress/i
  });

  Object.defineProperties(window, {
    innerWidth: { configurable: true, value: 1280 },
    innerHeight: { configurable: true, value: 720 },
    scrollY: { configurable: true, value: 860 }
  });
  Object.defineProperties(section, {
    offsetTop: { configurable: true, value: 500 },
    offsetHeight: { configurable: true, value: 1440 }
  });
  Object.defineProperties(track, {
    clientWidth: { configurable: true, value: 600 },
    scrollWidth: { configurable: true, value: 1200 }
  });

  fireEvent.scroll(window);

  expect(track.scrollLeft).toBeGreaterThan(300);
  expect(progress).toHaveAttribute('aria-valuenow', '56');
});
