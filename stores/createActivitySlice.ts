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
      const aggregated = { ...state.aggregatedActivities };

      for (const activity of activities) {
        const elapsedMonths = getActivityMonth(activity);

        if (elapsedMonths >= 0 && elapsedMonths < 12) {
          if (!Object.hasOwn(aggregated, elapsedMonths)) {
            aggregated[elapsedMonths] = {
              month: elapsedMonths,
              totalDistance: activity.distance,
              totalElevationGain: activity.totalElevationGain,
              totalTime: activity.time,
            };
          } else {
            aggregated[elapsedMonths].totalDistance += activity.distance;
            aggregated[elapsedMonths].totalElevationGain +=
              activity.totalElevationGain;
            aggregated[elapsedMonths].totalTime += activity.time;
          }
        }
      }

      return { ...state, aggregatedActivities: aggregated };
    }),
});
