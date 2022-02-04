import styled from 'styled-components/macro'

export const StyledSection = styled.section`
  .section {
    &__content {
      width: 100%;
      max-width: var(--max-width);
      margin: 0 auto;
      position: relative;
      padding: 6.4rem 2.4rem;

      @media screen and (min-width: 768px) {
        padding: 8rem 2.4rem;
      }
    }

    &__heading {
      display: flex;
      margin: 0;
      font-family: var(--font-display);
      font-size: 2.4rem;

      @media screen and (min-width: 414px) {
        font-size: 2.8rem;
      }

      @media screen and (min-width: 768px) {
        font-size: 3.2rem;
      }

      @media screen and (min-width: 960px) {
        font-size: 3.7rem;
      }

      a {
        color: var(--color-white);
        transition: all 0.4s ease;

        &:hover {
          text-decoration: underline;
          text-underline-offset: 0.2rem;
          opacity: 0.8;
        }
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-block-end: 4rem;
    }

    &__breadcrumb {
      display: flex;
      color: var(--color-gray);

      &::after {
        content: '/';
        display: block;
        margin: 0 0.4rem;
      }

      a {
        &:focus,
        &:hover {
          color: var(--color-white);
        }
      }
    }

    &__link--seeAll {
      text-transform: uppercase;
      color: var(--color-white);
      letter-spacing: 0.1rem;
      font-weight: 400;
      font-size: 1.4rem;
      opacity: 0.64;
      transition: all 0.4s ease;

      @media screen and (min-width: 414px) {
        font-size: 1.5rem;
      }

      @media screen and (min-width: 768px) {
        font-size: 1.6rem;
      }

      &:hover {
        text-decoration: underline;
        text-underline-offset: 0.2rem;
        opacity: 0.9;
      }
    }
  }
`
