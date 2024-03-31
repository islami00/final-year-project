export const StatusColor = {
  BLUE: 'blue.6',
  GRAY: 'gray.6',
  GREEN: 'green.6',
  RED: 'red.6',
} as const;

export type StatusColorDict = typeof StatusColor;
export type StatusColorOptions = StatusColorDict[keyof StatusColorDict];

export interface StatusCreatePartial {
  name: string;
  color: StatusColorOptions;
}
export interface StatusCreate extends StatusCreatePartial {
  order: number;
  boardId: string;
}
