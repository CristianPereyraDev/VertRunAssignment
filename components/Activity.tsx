import { View, Text, StyleSheet } from 'react-native';

type ActivityProps = {
  name: string;
  date: string;
  distance: number;
  time: number;
  totalElevationGain: number;
};

export default function Activity({
  name,
  date,
  distance,
  time,
  totalElevationGain,
}: ActivityProps) {
  const parsedDate = new Date(date).toLocaleString();
  const seconds = time;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMilliseconds = time % 1000;

  return (
    <View style={styles.container}>
      <Text style={styles.cardTextTitle}>{name}</Text>
      <Text style={styles.cardText}>Date: {parsedDate}</Text>
      <Text style={styles.cardText}>Distance: {distance}m</Text>
      <Text style={styles.cardText}>
        Time: {hours}:{minutes}:{seconds}
      </Text>
      <Text style={styles.cardText}>
        Total Elevation: {totalElevationGain}m
      </Text>
    </View>
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
  cardText: { fontSize: 16, marginBottom: 4 },
});
