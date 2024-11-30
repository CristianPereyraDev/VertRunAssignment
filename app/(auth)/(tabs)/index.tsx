import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import Activity from '@/components/Activity';
import { useActivities } from '@/hooks/useActivities';

export default function RecentActivities() {
  const { isLoading, refetch, activities } = useActivities();

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
            date={activity.date}
            distance={activity.distance}
            time={activity.time}
            totalElevationGain={activity.totalElevationGain}
          />
        ))}

        <Button
          title='Refetch'
          onPress={() => {
            refetch();
          }}
        />
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
