import {Coordinate} from '../types/types';

export const checkEatsPredator = (
  head: Coordinate,
  predator: Coordinate,
  area: number,
): boolean => {
  const distanceBetweenX = Math.abs(head.x - predator.x);
  const distanceBetweenY = Math.abs(head.y - predator.y);
  return distanceBetweenX < area && distanceBetweenY < area;
};
