const LIGHT_PALETTE = {
  background: '#e8efff',
  grid: 'rgba(19, 71, 232, 0.12)'
};

export const paintPachinkoSurface = (context, width, height, palette = LIGHT_PALETTE) => {
  context.clearRect(0, 0, width, height);
  context.fillStyle = palette.background;
  context.fillRect(0, 0, width, height);
  context.strokeStyle = palette.grid;
  context.lineWidth = 1;

  for (let x = 0; x < width; x += 28) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y < height; y += 28) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
};
