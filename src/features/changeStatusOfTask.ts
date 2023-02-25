import 'datejs';
import { getDate, tsQuerySelector } from '../helpers/helpers';
import { duration } from '../constants/constants';

export const roastedTask = (time: string, selector: HTMLElement) => {
  const currentDate = getDate();
  const durationTime = tsQuerySelector(selector, '.task-time__duration').textContent?.toLocaleLowerCase();
  if (!durationTime) return;
  const hours = duration[durationTime];
  const differenceInTime = Date.compare(Date.parse(currentDate), Date.parse(time).addHours(hours * 0.8));
  // console.log(Date.parse(currentDate))
  // console.log(Date.parse(currentDate));
  // console.log(Date.parse(time).addHours(hours * 0.8));
  // console.log(differenceInTime);
  if (differenceInTime >= 0) {
    tsQuerySelector(selector, '.task__roasted-gif').style.display = 'block';
  }
};

export const doneTask = (selector: HTMLElement) => {

};
