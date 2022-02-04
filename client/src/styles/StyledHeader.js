import styled from 'styled-components/macro'

export const StyledHeader = styled.header`
  min-height: 14.4rem;
  width: 100%;
  background: linear-gradient(to bottom, #080808, #fefefe08);

  .header__content {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    gap: 1.6rem;
    padding: 5.6rem 1.6rem 1.6rem 1.6rem;

    @media screen and (min-width: 390px) {
      padding: 6.4rem 2.4rem 1.6rem 2.4rem;
    }

    @media screen and (min-width: 414px) {
      padding-block-end: 2.4rem;
    }

    @media screen and (min-width: 768px) {
      width: 100%;
      padding: 9.6rem 3.2rem 4rem 3.2rem;
      gap: 2.4rem;
    }

    @media screen and (min-width: 960px) {
      padding-block-start: 12rem;
    }

    button {
      display: none;

      @media screen and (min-width: 768px) {
        display: block;
      }
    }
  }

  .profile__image {
    height: 6.4rem;
    width: 6.4rem;
    border-radius: 50%;
    align-self: flex-start;

    @media screen and (min-width: 768px) {
      align-self: center;
      height: 9.6rem;
      width: 9.6rem;
    }

    @media screen and (min-width: 960px) {
      height: 12.8rem;
      width: 12.8rem;
    }
  }

  .profile__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-block-end: 0.4rem;

    &__title {
      font-size: 1.1rem;
      text-transform: uppercase;
      line-height: 1;
      font-weight: 400;
      width: fit-content;

      @media screen and (min-width: 414px) {
        font-size: 1.3rem;
      }

      @media screen and (min-width: 768px) {
        font-size: 1.4rem;
      }
    }

    &__name {
      font-family: var(--font-display);
      font-size: clamp(2.4rem, 3.8vw, 5.6rem);
      line-height: 1.2;
      margin-block-end: 0.4rem;
    }

    &__details {
      font-size: 1.4rem;
      color: var(--color-grey);

      @media screen and (min-width: 768px) {
        font-size: 1.6rem;
      }
    }
  }
`
