export interface GestureEventType {
  nativeEvent: {
    translationX: number;
    translationY: number;
  };
}

export interface Coordinate {
  x: number;
  y: number;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface Quote {
  id?: string;
  author?: string;
  content?: string;
}
