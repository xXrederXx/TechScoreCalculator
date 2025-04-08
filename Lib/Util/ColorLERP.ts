type ColorStop = { stop: number; color: [number, number, number] };

// Helper to interpolate between two RGB colors
function interpolateColor(
  color1: [number, number, number],
  color2: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(color1[0] + (color2[0] - color1[0]) * t),
    Math.round(color1[1] + (color2[1] - color1[1]) * t),
    Math.round(color1[2] + (color2[2] - color1[2]) * t),
  ];
}

// Helper to convert RGB to HEX
function rgbToHex([r, g, b]: [number, number, number]): string {
  return `#${[r, g, b]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function getInterpolatedColorSlider(value: number): string {
  const stops: ColorStop[] = [
    { stop: 0, color: [139, 0, 0] },     // Dark Red
    { stop: 20, color: [255, 0, 0] },    // Red
    { stop: 50, color: [255, 165, 0] },  // Orange
    { stop: 80, color: [144, 238, 144] },// Light Green
    { stop: 90, color: [255, 165, 0] },  // Orange
    { stop: 100, color: [255, 0, 0] },   // Red
  ];

  value = Math.max(0, Math.min(100, value)); // Clamp to [0, 100]

  for (let i = 0; i < stops.length - 1; i++) {
    const current = stops[i];
    const next = stops[i + 1];
    if (value >= current.stop && value <= next.stop) {
      const t = (value - current.stop) / (next.stop - current.stop);
      const interpolated = interpolateColor(current.color, next.color, t);
      return rgbToHex(interpolated);
    }
  }

  // Should not reach here if value is within 0-100
  return "#000000"; // Fallback (black)
}
