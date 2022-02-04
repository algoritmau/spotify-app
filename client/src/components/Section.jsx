import { Link } from 'react-router-dom'

import { StyledSection } from '../styles'

export const Section = ({ title, breadcrumb, seeAllLink, children }) => (
  <StyledSection>
    <div className="section__content">
      <div className="section__header">
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
