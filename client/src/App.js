import { useEffect, useState } from 'react'
import { accessToken, logout } from './spotify'
import './App.css'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    setToken(accessToken)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {token ? (
          <div>
            <h1>Logged in</h1>
            <button onClick={logout}>Log Out</button>
          </div>
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
