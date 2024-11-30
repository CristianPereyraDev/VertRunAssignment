import { getActivityMonth } from '@/utilities/activity.utils';
import { StateCreator } from 'zustand';

export interface IActivity {
  id: number;
  name: string;
  date: string;
  distance: number;
  time: number;
  totalElevationGain: number;
}

export interface AggregatedActivity {
  month: number;
  totalDistance: number;
  totalTime: number;
  totalElevationGain: number;
}

export interface ActivitiesSlice {
  aggregatedActivities: Record<number, AggregatedActivity>;
  aggregateActivities: (activities: IActivity[]) => void;
}

export const createActivitySlice: StateCreator<
  ActivitiesSlice,
  [],
  [],
  ActivitiesSlice
> = (set) => ({
  aggregatedActivities: {},
  aggregateActivities: (activities) =>
    set((state) => {
      const aggregated: Record<number, AggregatedActivity> = {};
      const currentMonth = new Date().getMonth();

      for (const activity of activities) {
        const activityMonth = getActivityMonth(activity);

        if (activityMonth >= 0 && currentMonth - activityMonth < 3) {
          if (!Object.hasOwn(aggregated, activityMonth)) {
            aggregated[activityMonth] = {
              month: activityMonth,
              totalDistance: activity.distance,
              totalElevationGain: activity.totalElevationGain,
              totalTime: activity.time,
            };
          } else {
            aggregated[activityMonth].totalDistance += activity.distance;
            aggregated[activityMonth].totalElevationGain +=
              activity.totalElevationGain;
            aggregated[activityMonth].totalTime += activity.time;
          }
        }
      }

      return { ...state, aggregatedActivities: aggregated };
    }),
});
