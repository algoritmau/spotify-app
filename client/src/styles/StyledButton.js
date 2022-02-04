import styled from 'styled-components/macro'

export const StyledButton = styled.button`
  appearance: none;
  border: none;
  cursor: pointer;
  top: 2.4rem;
  right: 2.4rem;
  padding: 1.6rem 2.4rem;
  background-color: var(--color-green);
  color: var(--color-white);
  font-family: var(--font-body-copy);
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  min-width: 12.8rem;
  align-self: flex-start;

  transition: filter 0.2s ease-in-out;

  &:hover,
  &:focus {
    filter: brightness(1.1);
  }

  @media screen and (min-width: 768px) {
    rigth: 1.5rem;
  }
`
