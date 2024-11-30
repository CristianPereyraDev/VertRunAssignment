import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  makeRedirectUri,
  useAuthRequest,
  exchangeCodeAsync,
} from 'expo-auth-session';
import { Button } from 'react-native';
import { useBoundStore } from '@/stores/useBoundStore';
import { SafeAreaView } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.strava.com/oauth/mobile/authorize',
  tokenEndpoint: 'https://www.strava.com/oauth/token',
  revocationEndpoint: 'https://www.strava.com/oauth/deauthorize',
};

export default function Login() {
  const setUser = useBoundStore((state) => state.setUser);

  const redirectUri = makeRedirectUri({
    native: 'myapp://redirect',
  });
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '141420',
      scopes: ['activity:read_all'],
      redirectUri: redirectUri,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      exchangeCodeAsync(
        {
          clientId: '141420',
          redirectUri,
          code: code,
          extraParams: {
            // You must use the extraParams variation of clientSecret.
            // Never store your client secret on the client.
            client_secret: process.env.EXPO_PUBLIC_CLIENT_SECRET || '',
          },
        },
        { tokenEndpoint: 'https://www.strava.com/oauth/token' }
      ).then((tokenResponse) => {
        setUser({
          id: 'unknown',
          username: 'unknown',
          accessToken: tokenResponse.accessToken,
        });
      });
    }
  }, [response]);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Button
        color={'#e26d36'}
        disabled={!request}
        title='Login in to Strava'
        onPress={() => {
          promptAsync();
        }}
      />
    </SafeAreaView>
  );
}
