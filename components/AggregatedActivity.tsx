import { VERBOSE_MONTHS } from '@/constants/date';
import { router } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import {
  GestureHandlerRootView,
  Pressable,
} from 'react-native-gesture-handler';

type AggregatedActivityProps = {
  month: number;
  totalDistance: number;
  totalTime: number;
  totalElevationGain: number;
};

export default function AggregatedActivity({
  month,
  totalDistance,
  totalTime,
  totalElevationGain,
}: AggregatedActivityProps) {
  return (
    <GestureHandlerRootView>
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/(auth)/(activities)/[month]',
            params: { month },
          })
        }
      >
        <View style={styles.container}>
          <Text style={styles.cardTextTitle}>{VERBOSE_MONTHS[month]}</Text>
          <Text style={styles.cardText}>Total Distance: {totalDistance}m</Text>
          <Text style={styles.cardText}>Total Time: {totalTime}</Text>
          <Text style={styles.cardText}>
            Total Elevation Gain:{totalElevationGain}m
          </Text>
        </View>
      </Pressable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#e26d36', padding: 8 },
  cardTextTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  cardText: { fontSize: 16, textAlign: 'center', marginBottom: 4 },
});
