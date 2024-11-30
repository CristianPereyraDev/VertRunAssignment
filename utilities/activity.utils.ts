import { IActivity } from '@/stores/createActivitySlice';

export function getActivityMonth(activity: IActivity): number {
  return new Date(activity.date).getMonth();
}
