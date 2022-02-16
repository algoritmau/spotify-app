import axios from 'axios'

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_access_token',
  refreshToken: 'spotify_refresh_token',
  expireTime: 'spotify_token_expiration_time',
  timestamp: 'spotify_token_timestamp'
}

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp)
}

/**
 * Checks whether the amount of time has elapsed between the timestamp in localStorage
 * and the expiration time of the token
 * @returns {boolean} Whether localStorage's access token has expired
 */
const isTokenExpired = () => {
  const { accessToken, expireTime, timestamp } = LOCALSTORAGE_VALUES
  const delta = Date.now() - Number(timestamp)

  if (!accessToken || !timestamp) return false

  return delta / 1000 > Number(expireTime)
}

/**
 * Clear out localStorage and reload the page
 * @returns {void}
 */
export const logOut = () => {
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property])
  }

  window.location = window.location.origin
}

/**
 * Use the refresh token from localStorage to hit the `/refresh_token` endpoint
 * and update the localStorage with the new values
 * @returns {void}
 */
const refreshToken = async () => {
  try {
    // Logout if there's no refresh token stored or we ended up in reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error('Refresh token not found')

      logOut()

      return
    }

    // Use `/refresh_token` endpoint to get a new access token
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    )

    // Update localStorage with new access token
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    )
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())

    // Reload the page to reflect localStorage changes
    window.location.reload()
  } catch (error) {
    console.error(error)
  }
}

/**
 * Handles logic for retrieving the Spotify access token from localStorage or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in')
  }
  const hasError = urlParams.get('error')

  // If there's and error or the localStorage's token has expired, refresh the token
  if (
    hasError ||
    isTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === 'undefined'
  ) {
    refreshToken()
  }

  // If there's no error and the localStorage's token is valid, use it
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== 'undefined'
  ) {
    return LOCALSTORAGE_VALUES.accessToken
  }

  // If there's a token in the URLs query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property])
    }

    // Set timestamp
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())

    // Return access tokens from queryParams
    return queryParams[LOCALSTORAGE_KEYS.accessToken]
  }

  // We should never reach this point
  return false
}

export const accessToken = getAccessToken()

/**
 * Axios global request headers
 * https://github.com/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'https://api.spotify.com/v1'
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`
axios.defaults.headers['Content-Type'] = 'application/json'

/**
 * Get current user's profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 * @returns {Promise} A promise that resolves to the user's profile
 */
export const getCurrentUserProfile = () => axios.get('/me')

/**
 * Get current user's playlists
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-a-list-of-current-users-playlists
 * @returns {Promise} A promise that resolves to the user's playlists
 */
export const getCurrentUserPlaylists = (limit = 24) =>
  axios.get(`/me/playlists?limit=${limit}`)

/**
 * Get current user's top artists
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} type - The type to retrieve ('artists' or 'tracks')
 * @param {string} time_range - Over what time frame the data is calculated:
 *  short_term: Last 4 weeks, medium_term: Last 6 months, long_term: All time
 * Defaults to medium_term
 * @returns {Promise} A promise that resolves to the user's top artists
 */
export const getCurrentUserTopArtists = (time_range = 'short_term') =>
  axios.get(`/me/top/artists?time_range=${time_range}`)

/**
 * Get current user's top tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} type - The type to retrieve ('artists' or 'tracks')
 * @param {string} time_range - Over what time frame the data is calculated:
 *  short_term: Last 4 weeks, medium_term: Last 6 months, long_term: All time
 * Defaults to medium_term
 * @returns {Promise} A promise that resolves to the user's top tracks
 */
export const getCurrentUserTopTracks = (time_range = 'short_term') =>
  axios.get(`/me/top/tracks?time_range=${time_range}`)

/**
 * Get a playlist by ID
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlist
 * @param {string} playlist_id - The ID of the playlist
 * @returns {Promise} A promise that resolves to the playlist
 */
export const getPlaylistById = (playlist_id) =>
  axios.get(`/playlists/${playlist_id}`)

/**
 * Get audio features for several tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-several-audio-features
 * @param {string} ids - A comma-separated list of the Spotify IDs for the tracks
 * @returns {Promise} A promise that resolves to the audio features
 */
export const getTracksAudioFeatures = (ids) =>
  axios.get(`/audio-features?ids=${ids}`)
