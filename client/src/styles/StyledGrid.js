import styled from 'styled-components/macro'

export const StyledGrid = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12.8rem, 1fr));
  gap: 1.6rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(19.2rem, 1fr));
    gap: 2.4rem;
  }

  .grid {
    &__item {
      padding: 1.6rem;
      background: rgb(255 255 255 / 0.04);
      border-radius: 0.4rem;
      transition: background 0.4s ease;
      cursor: default;

      @media screen and (min-width: 768px) {
        padding: 2rem;
      }

      &:focus,
      &:hover {
        background: rgb(255 255 255 / 0.08);

        &__figure {
          box-shadow: 0 0.8rem 2.4rem rgb(8 8 8 / 0.48);
        }
      }

      &__figure {
        position: relative;
        padding-top: 100%;
        margin: 0 auto 2.4rem auto;
      }

      &__image {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: var(--color-gray);
        border-radius: ${(props) => (props.type === 'artist' ? '50%' : '2px')};
      }

      &__name {
        color: var(--color-white);
        font-family: var(--font-display);
        text-align: center;
        font-size: 1.8rem;
        margin-block-end: 0.4rem;
        letter-spacing: normal;
      }

      &__label {
        text-align: center;
        font-size: 1.5rem;
        color: var(--color-gray);
      }
    }
  }
`
