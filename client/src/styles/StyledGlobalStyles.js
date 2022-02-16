import { createGlobalStyle } from 'styled-components/macro'
import variables from './variables'

export const StyledGlobalStyles = createGlobalStyle`
  ${variables}

  @font-face {
    font-family: 'Faktum';
    src: url('/assets/fonts/Faktum-Bold.woff2') format('woff2'),
      url('/assets/fonts/Faktum-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Aktiv Grotesk';
    src: url('/assets/fonts/AktivGrotesk-Bold.woff2') format('woff2'),
      url('/assets/fonts/AktivGrotesk-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Aktiv Grotesk';
    src: url('/assets/fonts/AktivGrotesk-Regular.woff2') format('woff2'),
      url('/assets/fonts/AktivGrotesk-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-body-copy);
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

  .truncated {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .app-wrapper {
    position: relative;

    & > button {
      position: absolute;
      top: 2.4rem;
      right: 2.4rem;
      background-color: var(--color-black-light);
      transition: background-color 0.4s ease;

      &:focus,
      &:hover {
        background-color: var(--color-green);
      }

      @media screen and (min-width: 960px) {
        right: 16vw;
      }

      @media screen and (min-width: 1440px) {
        right: 20vw;
      }
    }
  }

  .sr-only {
    display: none;
  }
`
