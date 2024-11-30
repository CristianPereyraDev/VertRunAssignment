import { useQuery } from 'react-query';

import { IActivity } from '@/stores/createActivitySlice';
import { useBoundStore } from '@/stores/useBoundStore';
import { fetchActivities } from '@/services/fetchActivities';

/**
 * Custom hook to handle recent activities and maintain month aggregations updated.
 * @returns
 */
export const useActivities = () => {
  const user = useBoundStore((state) => state.user);
  const aggregateActivities = useBoundStore(
    (state) => state.aggregateActivities
  );

  const {
    isLoading,
    isFetching,
    isError,
    refetch,
    data: activities = [],
  } = useQuery<IActivity[]>(
    ['activities'],
    async () => fetchActivities(user?.accessToken),
    {
      onSettled: (data) => {
        if (data) aggregateActivities(data);
      },
    }
  );

  return { isLoading, isFetching, isError, refetch, activities };
};

/**
 * Custom hook to handle activities queries per month
 * @param month
 * @returns
 */
export const useMonthActivities = (month: number) => {
  const user = useBoundStore((state) => state.user);

  const {
    isLoading,
    isFetching,
    isError,
    refetch,
    data: activities = [],
  } = useQuery<IActivity[]>(['activities', month], async () =>
    fetchActivities(user?.accessToken || 'notToken', month)
  );

  return { isLoading, isFetching, isError, refetch, activities };
};
