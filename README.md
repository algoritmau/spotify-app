# Spotify App

## Features

- Uses the Spotify Web API to fetch data
- Uses `localStorage` to store the user's authorization tokens
- Uses React Router to navigate between pages
- Uses Styled Components to style the app

### `localStorage`

- Upon first visit, the app will request authorization from the user, the user logs in, and the app will store the user's authorization and refresh tokens (from query params) in `localStorage`.
- Store times in `localStorage` to prevent the app from requesting authorization again if the user refreshes the page.
- Upon next API call, the app will check if the user's authorization has expired. If not, the app will use the stored authorization tokens. Otherwise, use refresh token to get new authorization tokens (by hitting the `/refresh_token` endpoint).

A total of four items are stored in `localStorage`:

- Spotify access token
- Spotify refresh token
- Spotify access token expiration time (3600 seconds)
- Timestamp of last time the currently used access token was fetched and stored.
