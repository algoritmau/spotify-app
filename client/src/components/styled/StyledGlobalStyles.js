import { createGlobalStyle } from 'styled-components/macro'
import variables from './variables'

const StyledGlobalStyles = createGlobalStyle`
  ${variables}

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    font-size: 1.6rem;
    background-color: var(--color-black);
    color: var(--color-white);
    min-height: 100vh;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  li {
    list-style: none;
  }
`

export default StyledGlobalStyles
