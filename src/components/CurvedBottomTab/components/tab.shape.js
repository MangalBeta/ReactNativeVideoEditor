import * as shape from 'd3-shape';

export const getTabShape = (
  width: number,
  height: number,
  tabWidth: number,
  tabHeight: number
) => {
  const left = shape
    .line()
    .x((d: { x: number; y: number }) => d.x)
    .y((d: { x: number; y: number }) => d.y)([
    { x: 0, y: 0 },
    { x: width + tabWidth, y: 0 },
  ]);

  const right = shape
    .line()
    .x((d: { x: number; y: number }) => d.x)
    .y((d: { x: number; y: number }) => d.y)([
    { x: width + tabWidth+10, y: 0 },
    { x: width * 2.12, y: 0 },
    { x: width * 2.12, y: height },
    { x: 0, y: height + 0 },
    { x: 0, y: 0 },
  ]);

  const tab = shape
    .line()
    .x((d: { x: number; y: number }) => d.x)
    .y((d: { x: number; y: number }) => d.y)
    .curve(shape.curveBasis)([
    {
      x: width-60,
      y: 0,
    },
    { x: width + 18, y: 1 },
    { x: width + 25, y: tabHeight - 42 },
    { x: width + tabWidth - 25, y: tabHeight - 42 },
    { x: width + tabWidth - 11, y:1 },
    {
      x: width+152,
      y: 0,
    },
    {
      x: width+152,
      y: 0,
    },
  ]);

  const d = `${left} ${tab} ${right}`;

  return d;
};
