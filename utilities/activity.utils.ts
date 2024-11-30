import { IActivity } from '@/stores/createActivitySlice';

export function getActivityMonth(activity: IActivity): number {
  const endTime = Date.now();
  const startTime = Date.parse(activity.date);
  const elapsedTime = endTime - startTime;
  const elapsedMonths = Math.floor(elapsedTime / 1000 / 60 / 60 / 24 / 30);

  console.log('Activity date:', activity.date);
  console.log('elapsedMonths:', startTime);
  console.log('getMonth: ', new Date(activity.date).getMonth());

  return new Date(activity.date).getMonth();
}
