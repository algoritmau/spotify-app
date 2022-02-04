import { Link } from 'react-router-dom'

import { StyledGrid } from '../styles'

export const PlaylistsGrid = ({ playlists }) => (
  <>
    {playlists && playlists.length ? (
      <StyledGrid>
        {playlists.map((playlist, index) => (
          <li className="grid__item" key={index}>
            <Link
              to={`/playlists/${playlist.id}`}
              className="grid__item__content"
            >
              {playlist.images.length && playlist.images[0] && (
                <figure className="grid__item__figure">
                  <img
                    className="grid__item__image"
                    src={playlist.images[0].url}
                    alt={playlist.name}
                  />
                </figure>
              )}
              <h3 className="grid__item__name">{playlist.name}</h3>
              <p className="grid__item__label">Playlist</p>
            </Link>
          </li>
        ))}
      </StyledGrid>
    ) : (
      <p className="grid--empty">No playlists available</p>
    )}
  </>
)
