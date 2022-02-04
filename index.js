require('dotenv').config()

const express = require('express')
const queryString = require('query-string')
const randomstring = require('randomstring')
const axios = require('axios')

const app = express()
const port = process.env.PORT || 7777

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

app.get('/', (_, res) => res.send('Hello, world!'))

app.get('/login', (_, res) => {
  const AUTHORIZATION_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const scope = ['user-read-private user-read-email user-top-read'].join(' ')
  const state = randomstring.generate(16)
  const stateKey = 'spotify_auth_state'
  const queryParams = queryString.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope,
    state
  })

  res.cookie(stateKey, state)

  res.redirect(`${AUTHORIZATION_ENDPOINT}?${queryParams}`)
})

app.get('/callback', (req, res) => {
  const { code } = req.query || null

  axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`
    },
    data: queryString.stringify({
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  })
    .then((response) => {
      if (response.status === 200) {
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn
        } = response.data
        const queryParams = queryString.stringify({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn
        })

        // Redirect to client app and pass access token
        // and refresh token as query params
        res.redirect(`http://localhost:3000/?${queryParams}`)
      } else {
        res.redirect(`/?${queryString.stringify({ error: 'invalid_token' })}`)
      }
    })
    .catch((error) => res.send(error))
})

app.get('/refresh_token', (req, res) => {
  const { refresh_token: refreshToken } = req.query
  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString('base64')}`,
      'Access-Control-Allow-Origin': '*'
    },
    data: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  }

  axios(authOptions)
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error))
})

app.listen(port, () => {
  console.log(`🚀 App listening on http://localhost:${port}`)
})
