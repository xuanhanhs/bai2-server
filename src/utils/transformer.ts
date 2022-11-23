import { dateToString, stringToDate } from './fn';

export const dateTransformer = {
  to: (value: string): Date => stringToDate(value),
  from: (value: Date): string => dateToString(value),
};
