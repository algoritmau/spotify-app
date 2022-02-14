import { Link } from 'react-router-dom'

import { StyledSection } from '../styles'

export const Section = ({
  title,
  breadcrumb,
  seeAllLink,
  timeRangeButtons,
  timeRangeButtonOnClickFn,
  activeRange,
  children
}) => (
  <StyledSection>
    <div className="section__content">
      <div
        className={`${
          timeRangeButtons ? 'section__header--alt' : 'section__header'
        }`}
      >
        <h2 className="section__heading">
          {breadcrumb && (
            <span className="section__breadcrumb">
              <Link to="/">Profile</Link>
            </span>
          )}
          {title && (
            <>
              {seeAllLink ? (
                <Link to={seeAllLink}>{title}</Link>
              ) : (
                <span>{title}</span>
              )}
            </>
          )}
        </h2>
        {timeRangeButtons && (
          <nav className="section__dateRangeTabs">
            <button
              className={
                activeRange === 'short'
                  ? 'section__dateRangeTab section__dateRangeTab--active'
                  : 'section__dateRangeTab'
              }
              onClick={() => timeRangeButtonOnClickFn('short')}
            >
              This month
            </button>
            <button
              className={
                activeRange === 'medium'
                  ? 'section__dateRangeTab section__dateRangeTab--active'
                  : 'section__dateRangeTab'
              }
              onClick={() => timeRangeButtonOnClickFn('medium')}
            >
              Last 6 months
            </button>
            <button
              className={
                activeRange === 'long'
                  ? 'section__dateRangeTab section__dateRangeTab--active'
                  : 'section__dateRangeTab'
              }
              onClick={() => timeRangeButtonOnClickFn('long')}
            >
              All time
            </button>
          </nav>
        )}
        {seeAllLink && (
          <Link to={seeAllLink} className="section__link--seeAll">
            See All
          </Link>
        )}
      </div>

      {children}
    </div>
  </StyledSection>
)
