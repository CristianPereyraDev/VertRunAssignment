import { IActivity } from '@/stores/createActivitySlice';

type ActivityListResponse = {
  id: number;
  name: string;
  start_date_local: string;
  distance: number;
  elapsed_time: number;
  total_elevation_gain: number;
}[];

export const fetchActivities = async (
  token?: string,
  month?: number
): Promise<IActivity[]> => {
  if (token === undefined) throw new Error('Token no provided');

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
      return (await res.json()) as ActivityListResponse;
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
