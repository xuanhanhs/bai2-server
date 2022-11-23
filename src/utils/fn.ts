import * as moment from 'moment';
import { FORMAT_DATE } from './constant';

export const stringToDate = (date: string): Date => {
  return moment(date, FORMAT_DATE).toDate();
};

export const dateToString = (date: Date): string => {
  return moment(date).format(FORMAT_DATE);
};
