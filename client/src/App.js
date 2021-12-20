import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    // const accessToken = urlParams.get('access_token')
    const refreshToken = urlParams.get('refresh_token')

    if (refreshToken) {
      fetch(`/refresh_token?refresh_token=${refreshToken}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(`[💥 An error has occurred] ${error}`))
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="http://localhost:7777/login">
          Log in to Spotify
        </a>
      </header>
    </div>
  )
}

export default App
