import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import Activity from '@/components/Activity';
import { useMonthActivities } from '@/hooks/useActivities';
import { VERBOSE_MONTHS } from '@/constants/date';

export default function ActivitiesPerMonth() {
  const params = useLocalSearchParams<{ month: string }>();
  console.log('render ActivitiesPerMonth:', params);

  const { isLoading, refetch, activities } = useMonthActivities(
    Number(params.month)
  );

  if (activities) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 5,
          paddingVertical: 16,
        }}
      >
        <Text style={{ fontSize: 18 }}>
          {VERBOSE_MONTHS[Number(params.month)]}
        </Text>
        <View>
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
        </View>
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
