import { useQuery } from 'react-query';

import { IActivity } from '@/stores/createActivitySlice';
import { useBoundStore } from '@/stores/useBoundStore';

const fetchActivities = async (
  token: string,
  month?: number
): Promise<IActivity[]> => {
  console.log('month:', month);
  const after = new Date();
  const before = new Date();

  if (month) {
    before.setMonth(month + 1);
    before.setDate(0);
    after.setMonth(month);
    after.setDate(1);
  } else {
    after.setMonth(1);
    after.setDate(1);
  }

  return await fetch(
    `https://www.strava.com/api/v3/athlete/activities?after=${
      after.getTime() / 1000
    }&before=${before.getTime() / 1000}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then(async (res) => {
      //console.log(res);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error en la petición: ${text}`);
      }
      return await res.json();
    })
    .then((res) => {
      //console.log(res);
      return res.map(
        (act) =>
          ({
            id: act.id,
            name: act.name,
            date: act.start_date_local,
            distance: act.distance,
            time: act.elapsed_time,
            totalElevationGain: act.total_elevation_gain,
          } satisfies IActivity)
      );
    });
};

export const useActivities = () => {
  console.log('useActivities');
  const user = useBoundStore((state) => state.user);
  const aggregateActivities = useBoundStore(
    (state) => state.aggregateActivities
  );

  const {
    isLoading,
    isError,
    refetch,
    data: activities = [],
  } = useQuery<IActivity[]>(
    ['activities'],
    async () => fetchActivities(user?.accessToken || 'notToken'),
    {
      onSettled: (data) => {
        console.log('onSettled:', data);
        if (data) aggregateActivities(data);
      },
    }
  );

  return { isLoading, isError, refetch, activities };
};

export const useMonthActivities = (month: number) => {
  console.log('useMonthActivities: ', month);
  const user = useBoundStore((state) => state.user);
  const aggregateActivities = useBoundStore(
    (state) => state.aggregateActivities
  );

  const {
    isLoading,
    isError,
    refetch,
    data: activities = [],
  } = useQuery<IActivity[]>(
    ['activities', month],
    async () => fetchActivities(user?.accessToken || 'notToken', month),
    {
      onSettled: (data) => {
        console.log('onSettled:', data);
        if (data) aggregateActivities(data);
      },
    }
  );

  return { isLoading, isError, refetch, activities };
};
