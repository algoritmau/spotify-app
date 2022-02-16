import styled, { keyframes } from 'styled-components/macro'

const equalizerAnimation = keyframes`
  from {
    height: 10px;
  }
  to {
    height: 100%;
  }
`

export const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  height: 100vh;
  width: 100vw;

  .bars {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    width: 100px;
    min-width: 100px;
    height: 50px;
    margin: 0 auto;
    z-index: 2;
    position: relative;
    left: 0;
    right: 0;
  }
`

export const StyledBar = styled.div`
  width: 10px;
  height: 5px;
  margin: 0 2px;
  background-color: var(--color-gray);
  animation-name: ${equalizerAnimation};
  animation-duration: 400ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${(props) => props.delay || '0ms'};
`
