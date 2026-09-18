const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum);

export const createFrameScrubber = (
  renderFrame,
  {
    frameCount,
    getViewportWidth,
    requestFrame,
    cancelFrame
  }
) => {
  let pendingClientX = null;
  let frameId = null;
  let destroyed = false;

  const flush = () => {
    frameId = null;
    if (destroyed || pendingClientX === null) return;

    const progress = clamp(
      pendingClientX / Math.max(getViewportWidth(), 1),
      0,
      1
    );
    pendingClientX = null;
    renderFrame(Math.round(progress * Math.max(frameCount - 1, 0)));
  };

  return {
    scrubTo(clientX) {
      pendingClientX = clientX;
      if (frameId === null) frameId = requestFrame(flush);
    },
    destroy() {
      destroyed = true;
      pendingClientX = null;
      if (frameId !== null) cancelFrame(frameId);
      frameId = null;
    }
  };
};
