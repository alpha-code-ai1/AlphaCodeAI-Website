import { paintPachinkoSurface } from './pachinkoDrawing';

test('paints the pachinko board as a light blueprint surface', () => {
  const fills = [];
  const strokes = [];
  const context = {
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    set fillStyle(value) {
      fills.push(value);
    },
    set strokeStyle(value) {
      strokes.push(value);
    },
    set lineWidth(value) {}
  };

  paintPachinkoSurface(context, 112, 84);

  expect(fills[0]).toBe('#e8efff');
  expect(strokes[0]).toBe('rgba(19, 71, 232, 0.12)');
  expect(context.fillRect).toHaveBeenCalledWith(0, 0, 112, 84);
  expect(context.stroke).toHaveBeenCalledTimes(7);
});

test('accepts a dark surface palette', () => {
  const fills = [];
  const strokes = [];
  const context = {
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    stroke: jest.fn(),
    set fillStyle(value) {
      fills.push(value);
    },
    set strokeStyle(value) {
      strokes.push(value);
    },
    set lineWidth(value) {}
  };

  paintPachinkoSurface(context, 112, 84, {
    background: '#0b1020',
    grid: 'rgba(113, 132, 255, 0.16)'
  });

  expect(fills[0]).toBe('#0b1020');
  expect(strokes[0]).toBe('rgba(113, 132, 255, 0.16)');
});
