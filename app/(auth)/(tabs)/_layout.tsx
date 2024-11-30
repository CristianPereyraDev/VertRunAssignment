import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#2c2c2c' },
        tabBarActiveTintColor: '#e26d36',
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Your Resent Activities',
          tabBarIcon: ({ color }) => <TabBarIcon name='bolt' color={color} />,
        }}
      />
      <Tabs.Screen
        name='stats'
        options={{
          title: 'Your Stats (Last three months)',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='bar-chart' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
