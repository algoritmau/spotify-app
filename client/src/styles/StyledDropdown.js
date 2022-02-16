import styled from 'styled-components/macro'

export const StyledDropdown = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 48%;
    right: 8px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fefefe;
  }

  select {
    -webkit-appearance: none;
    appearance: none;
    background-color: ${(props) =>
      props.active ? `rgb(255 255 255 / 0.1)` : 'transparent'};
    color: #fefefe;
    border: 0;
    border-radius: 4px;
    font-size: 1.6rem;
    font-family: inherit;
    padding: 1.2rem 1.6rem;

    @media screen and (min-width: 640px) {
      font-size: 1.8rem;
    }
  }
`
