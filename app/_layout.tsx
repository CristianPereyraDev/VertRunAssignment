import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useBoundStore } from '@/stores/useBoundStore';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';

export const unstable_settings = {
  initialRouteName: '/login',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const user = useBoundStore((state) => state.user);

  useProtectedRoute(user);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name='(auth)/(tabs)' options={{ headerShown: false }} />
        <Stack.Screen
          name='(auth)/(activities)/[month]'
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerTitleAlign: 'center',
            title: 'Activities of the Month',
          }}
        />
        <Stack.Screen name='(public)/login' options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
