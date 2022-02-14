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

      &--alt {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 9.6rem;
        margin-block-end: 2.4rem;

        @media screen and (min-width: 768px) {
          flex-direction: row;
          align-items: center;
        }
      }
    }

    &__breadcrumb {
      display: flex;
      color: var(--color-gray);

      &::after {
        content: '/';
        display: block;
        margin: 0 0.8rem;
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

    &__dateRangeTabs {
      display: flex;
      gap: 0.8rem;
      overflow-x: auto;
    }

    &__dateRangeTab {
      min-width: 12.8rem;

      appearance: none;
      border: none;
      cursor: pointer;
      padding: 1.6rem 0.8rem;
      background-color: var(--color-black-light);
      color: var(--color-white);
      font-family: var(--font-body-copy);
      font-size: 1.5rem;
      font-weight: 700;
      border-radius: var(--border-radius-pill);

      transition: filter 0.2s ease-in-out;

      @media screen and (min-width: 768px) {
        font-size: 1.6rem;
      }

      &--active {
        background-color: var(--color-green);
      }

      &:hover,
      &:focus {
        filter: brightness(1.1);
      }
    }
  }
`
