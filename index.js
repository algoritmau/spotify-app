require('dotenv').config()

const express = require('express')
const queryString = require('query-string')
const randomstring = require('randomstring')
const axios = require('axios')
const { response } = require('express')

const app = express()
const port = process.env.PORT || 7777

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

app.get('/', (_, res) => res.send('Hello, world!'))

app.get('/login', (_, res) => {
  const AUTHORIZATION_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const scope = 'user-read-private user-read-email'
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
        const { access_token: accessToken, token_type: tokenType } =
          response.data

        res.cookie('access_token', `${tokenType} ${accessToken}`)

        axios
          .get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `${tokenType} ${accessToken}`
            }
          })
          .then((apiResponse) =>
            res.send(`<pre>${JSON.stringify(apiResponse.data, null, 2)}</pre>`)
          )
          .catch((error) => res.send(error))
      } else {
        res.send(response)
      }
    })
    .catch((error) => res.send(error))
})

app.get('/refresh_token', (req, res) => {
  const { refresh_token: refreshToken } = req.query

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
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  })
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error))
})

app.listen(port, () => {
  console.log(`🚀 App listening on http://localhost:${port}`)
})
