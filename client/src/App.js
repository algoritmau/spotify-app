import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { accessToken, logOut } from './spotify'

import {
  NotFound,
  Login,
  Playlist,
  Playlists,
  Profile,
  TopArtists,
  TopTracks
} from './pages'

import { Button } from './components'
import { StyledGlobalStyles } from './styles'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(accessToken)
  }, [token])

  return (
    <>
      <StyledGlobalStyles />
      <div className="app-wrapper">
        {token ? (
          <>
            <Router>
              <Button onClickFn={logOut} text="Log Out" />
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
      </div>
    </>
  )
}

export default App
