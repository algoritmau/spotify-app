import { StyledGrid } from '../styles'

export const Grid = ({ artists }) => (
  <>
    {artists && artists.length ? (
      <StyledGrid type="artist">
        {artists.map((artist, index) => (
          <li className="grid__item" key={index}>
            <div className="grid__item__content">
              {artist.images[0] && (
                <figure className="grid__item__figure">
                  <img
                    className="grid__item__image"
                    src={artist.images[0].url}
                    alt={artist.name}
                  />
                </figure>
              )}
              <h3 className="grid__item__name">{artist.name}</h3>
              <p className="grid__item__label">Artist</p>
            </div>
          </li>
        ))}
      </StyledGrid>
    ) : (
      <p className="grid--empty">No artists available</p>
    )}
  </>
)
