import { createFrameScrubber } from './frameScrubber';

test('coalesces cursor updates and selects the newest predecoded frame', () => {
  const frames = [];
  const renderFrame = jest.fn();
  const scrubber = createFrameScrubber(renderFrame, {
    frameCount: 97,
    getViewportWidth: () => 1000,
    requestFrame: (callback) => {
      frames.push(callback);
      return frames.length;
    },
    cancelFrame: jest.fn()
  });

  scrubber.scrubTo(100);
  scrubber.scrubTo(450);
  scrubber.scrubTo(900);

  expect(frames).toHaveLength(1);
  expect(renderFrame).not.toHaveBeenCalled();

  frames[0]();

  expect(renderFrame).toHaveBeenCalledTimes(1);
  expect(renderFrame).toHaveBeenCalledWith(86);
});
