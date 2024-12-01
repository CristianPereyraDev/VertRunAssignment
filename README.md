# Expo App To Visualize Strava Activities And Activities Stats.

This is an [Expo](https://expo.dev).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. To run the app, a development build is needed. It might be downloaded from the link below:   

- [development build](https://expo.dev/accounts/cristianpereyradev/projects/VertRunAssignment/builds/4fbb19fa-28cb-4470-8a66-810074dffe0f)

## Project Overview
The following libraries were used to implement the assignment:
- Expo
- Zustand
- React Query
- Strava API

## Considerations
- The solution mainly focuses on the required functionalities, simplifying styles and layout design.
- The OAuth flow was made entirely on the client side. In a production scenario, the token should be obtained through a server, and the client_secret should be maintained privately.
- One point to improve is the handling of token expiration. It could be handled by checking the expiration_time and utilizing a refresh_token. This information could be stored in the Zustand state along with user data.
