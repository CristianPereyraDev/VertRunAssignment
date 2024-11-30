import { router, useSegments } from 'expo-router';
import { useEffect } from 'react';

import { User } from '@/stores/createUserSlice';

export function useProtectedRoute(user: User | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && inAuthGroup) {
      router.replace('/login');
    } else if (user && !inAuthGroup) {
      router.replace('/(auth)/(tabs)/');
    }
  }, [user, segments]);
}
