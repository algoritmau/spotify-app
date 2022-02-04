import { formatTrackLength } from '../utils'

import { StyledTracksList } from '../styles'

export const TracksList = ({ tracks }) => (
  <>
    {tracks && tracks.length ? (
      <StyledTracksList>
        {tracks.map((track, index) => (
          <li key={index} className="tracksList__track">
            <div className="tracksList__track__number">{index + 1}</div>
            {track.album.images.length && track.album.images[2] && (
              <figure className="tracksList__track__coverWrapper">
                <img
                  src={track.album.images[2].url}
                  alt={track.name}
                  className="tracksList__track__cover"
                />
              </figure>
            )}
            <div className="tracksList__track__heading">
              <h4 className="tracksList__track__name truncated">
                {track.name}
              </h4>
              <p className="tracksList__track__artist truncated">
                {track.artists.map((artist, index) => (
                  <span key={index}>
                    {artist.name}
                    {index !== track.artists.length - 1 && ', '}
                  </span>
                ))}
              </p>
            </div>
            <p className="tracksList__track__album truncated">
              {track.album.name}
            </p>
            <p className="tracksList__track__duration">
              {formatTrackLength(track.duration_ms)}
            </p>
          </li>
        ))}
      </StyledTracksList>
    ) : (
      <p className="tracksList--empty">No tracks available</p>
    )}
  </>
)
