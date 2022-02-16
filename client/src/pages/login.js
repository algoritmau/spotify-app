import styled from 'styled-components/macro'

// TODO: Move styles to its own file

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--color-green);
  color: var(--color-white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: 1.6rem;
  padding: 1.6rem 2.4rem;
  transition: filter 0.2s ease-in-out;

  &:hover,
  &:focus {
    filter: brightness(1.1);
  }
`

const StyledLoginHeading = styled.h1`
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(4rem, 6.4vw, 5.2rem);
  margin-block-end: 1.6rem;
`

const StyledLoginDescription = styled.h1`
  font-size: clamp(1.8rem, 4.8vw, 2.8rem);
  font-weight: 400;
  text-align: center;
  width: 72%;
  margin: 0 auto;
  margin-block-end: 4.8rem;
`

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:7777/login'
    : 'https://mispotify.herokuapp.com/login'

export const Login = () => (
  <StyledLoginContainer>
    <StyledLoginHeading>Log In</StyledLoginHeading>
    <StyledLoginDescription>
      Log in to your Spotify account to get started
    </StyledLoginDescription>
    <StyledLoginButton href={LOGIN_URI}>Log in to Spotify</StyledLoginButton>
  </StyledLoginContainer>
)
