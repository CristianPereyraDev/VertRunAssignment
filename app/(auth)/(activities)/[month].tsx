import { View, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import Activity from '@/components/Activity';
import { useMonthActivities } from '@/hooks/useActivities';
import { VERBOSE_MONTHS } from '@/constants/date';
import { IActivity } from '@/stores/createActivitySlice';

const renderItem = ({ item }: { item: IActivity }) => (
  <Activity
    key={item.id}
    name={item.name}
    date={item.date}
    distance={item.distance}
    time={item.time}
    totalElevationGain={item.totalElevationGain}
  />
);

export default function ActivitiesPerMonth() {
  const params = useLocalSearchParams<{ month: string }>();
  console.log('render ActivitiesPerMonth:', params);

  const { isLoading, isFetching, isError, refetch, activities } =
    useMonthActivities(Number(params.month));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {activities.length >= 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 16,
          }}
        >
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 26 }}>
              {VERBOSE_MONTHS[Number(params.month)]}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              data={activities}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              ListEmptyComponent={() => (
                <Text style={{ fontSize: 16 }}>
                  There is not activities in this month.
                </Text>
              )}
            />
          </View>

          <View style={{ flex: 0 }}>
            <Button
              title='Refetch'
              onPress={() => {
                refetch();
              }}
              color={'#e65d27'}
            />
          </View>
        </View>
      )}

      {(isLoading || isFetching) && (
        <View
          style={{
            position: 'absolute',
            left: 8,
            top: 8,
          }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      )}

      {isError && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>An error has been occurred</Text>
        </View>
      )}
    </View>
  );
}
