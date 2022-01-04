import { useEffect, useState } from 'react'
import { accessToken, getCurrentUserProfile, logout } from './spotify'
import { catchErrors } from './utils'
import './App.css'

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
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {token ? (
          <main>
            <h1>Logged in</h1>
            <button onClick={logout}>Log Out</button>
            {profile && (
              <section>
                <img src={profile.images[0]?.url} alt={profile.display_name} />
                <h2>{profile.display_name}</h2>
                <p>{profile.followers.total} Followers</p>
              </section>
            )}
          </main>
        ) : (
          <a className="App-link" href="http://localhost:7777/login">
            Log in to Spotify
          </a>
        )}
      </header>
    </div>
  )
}

export default App
