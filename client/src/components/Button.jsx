import { StyledButton } from '../styles'

export const Button = ({ text, onClickFn }) => (
  <StyledButton onClick={onClickFn}>{text}</StyledButton>
)
