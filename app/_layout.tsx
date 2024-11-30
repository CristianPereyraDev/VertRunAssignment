import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useBoundStore } from '@/stores/useBoundStore';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '/login',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const user = useBoundStore((state) => state.user);

  useProtectedRoute(user);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name='(auth)/(tabs)' />
        <Stack.Screen name='(public)/login' />
      </Stack>
    </QueryClientProvider>
  );
}
