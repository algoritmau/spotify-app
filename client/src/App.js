import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { accessToken } from './spotify'

import {
  NotFound,
  Login,
  Playlist,
  Playlists,
  Profile,
  TopArtists,
  TopTracks
} from './pages'

import { StyledGlobalStyles } from './components/styled'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(accessToken)
  }, [token])

  return (
    <>
      <StyledGlobalStyles />
      <div>
        <main className="App-header">
          {token ? (
            <>
              <Router>
                <Routes>
                  <Route path="/top-artists" element={<TopArtists />} />
                  <Route path="/top-tracks" element={<TopTracks />} />
                  <Route path="/playlists/:id" element={<Playlist />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </>
          ) : (
            <Login />
          )}
        </main>
      </div>
    </>
  )
}

export default App
