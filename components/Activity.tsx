import { View, Text } from 'react-native';

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
  return (
    <View style={{ backgroundColor: 'red' }}>
      <Text>{name}</Text>
      <Text>{date}</Text>
      <Text>{distance}</Text>
      <Text>{time}</Text>
      <Text>{totalElevationGain}</Text>
    </View>
  );
}
