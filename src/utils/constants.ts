export const PAGE_URL = {
  HOME: "/",
  PLAY: "/play",
  LEVELS: "/level",
  SCORE_BOARD: "/score-board",
};

export enum LEVEL {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
  GOD = "GOD",
}

export const LEVE_POINT = {
  [LEVEL.EASY]: 100,
  [LEVEL.MEDIUM]: 125,
  [LEVEL.HARD]: 150,
  [LEVEL.GOD]: 0,
}