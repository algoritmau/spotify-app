import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { accessToken, getCurrentUserProfile, logout } from './spotify'

import { NotFound, Playlist, Playlists, TopArtists, TopTracks } from './pages'

import { catchErrors } from './utils'

import { StyledGlobalStyles, StyledLogInButton } from './components/styled'

function App() {
  const [token, setToken] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    setToken(accessToken)

    const fecthProfileData = async () => {
      const { data: profileData } = await getCurrentUserProfile()
      setProfile(profileData)
    }

    catchErrors(fecthProfileData())
  }, [token, profile])

  const Home = () => (
    <div>
      <button onClick={logout}>Log Out</button>
      {profile && (
        <section>
          <img src={profile.images[0]?.url} alt={profile.display_name} />
          <h2>{profile.display_name}</h2>
          <p>{profile.followers.total} Followers</p>
        </section>
      )}
    </div>
  )

  return (
    <>
      <StyledGlobalStyles />
      <div>
        <main className="App-header">
          {token ? (
            <Router>
              <Routes>
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-tracks" element={<TopTracks />} />
                <Route path="/playlists/:id" element={<Playlist />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          ) : (
            <StyledLogInButton href="http://localhost:7777/login">
              Log in to Spotify
            </StyledLogInButton>
          )}
        </main>
      </div>
    </>
  )
}

export default App
