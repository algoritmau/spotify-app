import styled from 'styled-components/macro'

export const StyledTracksList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  .tracksList {
    &__track {
      display: grid;
      align-items: center;
      grid-template-columns: 1.6rem 4.8rem 1fr 4rem;
      gap: 16px;
      color: var(--color-white);
      font-size: 1.6rem;
      transition: transform 0.2s ease;

      &:not(:last-child) {
        border-bottom: 1px solid #fefefe16;
        padding-block-end: 16px;
        margin-block-end: 16px;
      }

      &:hover {
        transform: translateX(16px);
      }

      @media (min-width: 768px) {
        grid-template-columns: 1.6rem 6.4rem 2fr 1fr 4rem;
      }

      &__number {
        font-size: 1.7rem;
        color: var(--color-gray);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-variant-numeric: tabular-nums;

        @media screen and (min-width: 390px) {
          font-size: 1.8rem;
        }

        @media screen and (min-width: 414px) {
          font-size: 2rem;
        }
      }

      &__coverWrapper {
        height: 4.8rem;
        width: 4.8rem;
        border-radius: 2px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (min-width: 768px) {
          height: 5.6rem;
          width: 5.6rem;
        }
      }

      &__cover {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }

      &__heading {
        overflow: hidden;
      }

      &__name {
        width: 96%;
        font-size: 1.6rem;
        margin-block-end: 0.6rem;

        @media screen and (min-width: 390px) {
          width: 94%;
          font-size: 1.7rem;
        }

        @media screen and (min-width: 414px) {
          font-size: 1.8rem;
        }

        @media screen and (min-width: 768px) {
          margin-block-end: 1rem;
          font-size: 2rem;
        }
      }

      &__artist {
        width: 90%;
        font-size: 1.4rem;
        color: var(--color-gray);

        @media screen and (min-width: 390px) {
          width: 94%;
          font-size: 1.5rem;
        }

        @media screen and (min-width: 414px) {
          font-size: 1.6rem;
        }

        @media screen and (min-width: 768px) {
          font-size: 1.8rem;
        }
      }

      &__album {
        display: none;

        @media (min-width: 768px) {
          display: block;
          font-size: 1.8rem;
          white-space: nowrap;
        }
      }

      &__duration {
        display: flex;
        justify-content: flex-end;
        font-variant-numeric: tabular-nums;
        font-size: 1.7rem;

        @media screen and (min-width: 390px) {
          font-size: 1.8rem;
        }

        @media screen and (min-width: 414px) {
          font-size: 2rem;
        }
      }
    }
  }
`
