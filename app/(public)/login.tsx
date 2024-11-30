import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  makeRedirectUri,
  useAuthRequest,
  exchangeCodeAsync,
} from 'expo-auth-session';
import { Button } from 'react-native';
import { useBoundStore } from '@/stores/useBoundStore';

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
    // the "redirect" must match your "Authorization Callback Domain" in the Strava dev console.
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

      console.log('response:', response);
      console.log('response.params:', response.params);
      console.log('code:', code);

      exchangeCodeAsync(
        {
          clientId: '141420',
          redirectUri,
          code: code,
          extraParams: {
            // You must use the extraParams variation of clientSecret.
            // Never store your client secret on the client.
            client_secret: 'ae1ad37d058242dd01c569d47c1f6c8aa8bb578c',
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
    <Button
      disabled={!request}
      title='Login'
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
