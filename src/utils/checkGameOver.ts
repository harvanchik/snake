import {Coordinate} from '../types/types';

export const checkGameOver = (
  wormHead: Coordinate,
  boundaries: any,
): boolean => {
  return (
    wormHead.x < boundaries.minX ||
    wormHead.x > boundaries.maxX ||
    wormHead.y < boundaries.minY ||
    wormHead.y > boundaries.maxY
  );
};
