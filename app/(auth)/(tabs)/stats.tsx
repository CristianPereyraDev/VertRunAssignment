import { Text, View } from 'react-native';

import { useBoundStore } from '@/stores/useBoundStore';
import AggregatedActivity from '@/components/AggregatedActivity';

export default function Stats() {
  const aggregatedActivities = useBoundStore(
    (state) => state.aggregatedActivities
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
        paddingVertical: 8,
      }}
    >
      {Object.values(aggregatedActivities).map((aggregated, i) => (
        <AggregatedActivity
          key={aggregated.month}
          month={aggregated.month}
          totalDistance={aggregated.totalDistance}
          totalTime={aggregated.totalTime}
          totalElevationGain={aggregated.totalElevationGain}
        />
      ))}
    </View>
  );
}
