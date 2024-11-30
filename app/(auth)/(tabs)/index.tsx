import Activity from '@/components/Activity';
import { FAKE_ACTIVITIES } from '@/constants/fakes';
import { useBoundStore } from '@/stores/useBoundStore';
import { View, Text } from 'react-native';
import { useQuery } from 'react-query';

const fetchActivities = async (token: string) => {
  console.log('token:', token);
  return await fetch('https://www.strava.com/api/v3/athlete/activities', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      console.log(res);
      if (!res.ok) throw new Error(`Error en la petición: ${res.text}`);
      return await res.json();
    })
    .then((res) => FAKE_ACTIVITIES);
};

export default function Activities() {
  const user = useBoundStore((state) => state.user);

  const {
    isLoading,
    isError,
    data: activities = [],
  } = useQuery(['activities'], async () =>
    fetchActivities(user?.accessToken || 'notToken')
  );

  if (activities) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {activities.map((activity) => (
          <Activity
            key={activity.id}
            name={activity.name}
            date={activity.start_date_local}
            distance={activity.distance}
            time={activity.elapsed_time}
            totalElevationGain={activity.total_elevation_gain}
          />
        ))}
      </View>
    );
  }

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>ERROR</Text>
    </View>
  );
}
