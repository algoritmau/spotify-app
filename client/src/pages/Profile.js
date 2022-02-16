import { useEffect, useState } from 'react'

import {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getCurrentUserTopArtists,
  getCurrentUserTopTracks
} from '../spotify'

import { catchErrors } from '../utils'

import { Grid, PlaylistsGrid, Section, TracksList } from '../components'

import { StyledHeader } from '../styles'

export const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [playlists, setPlaylists] = useState(null)
  const [topArtists, setTopArtists] = useState(null)
  const [topTracks, setTopTracks] = useState(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      const { data: profileData } = await getCurrentUserProfile()
      const { data: playlistsData } = await getCurrentUserPlaylists()
      const { data: topArtistsData } = await getCurrentUserTopArtists()
      const { data: topTracksData } = await getCurrentUserTopTracks()

      setProfile(profileData)
      setPlaylists(playlistsData)
      setTopArtists(topArtistsData)
      setTopTracks(topTracksData)
    }

    catchErrors(fetchProfileData())
  }, [])

  return (
    <>
      {profile && playlists && topArtists && (
        <StyledHeader>
          <div className="header__content">
            {profile.images.length && profile.images[0].url && (
              <img
                src={profile.images[0].url}
                alt="User Avatar"
                className="profile__image"
              />
            )}
            <div className="profile__info">
              <h1 className="profile__info__title">Profile</h1>
              <p className="profile__info__name">{profile.display_name}</p>
              <p className="profile__info__details">
                <span>{profile.followers.total} Followers</span>
                &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <span>{playlists.total} Playlists</span>
                &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                <span>{topArtists.total} Top Artists</span>
              </p>
            </div>
          </div>
        </StyledHeader>
      )}
      <main>
        {topArtists && (
          <Section title="Recent top artists" seeAllLink="/top-artists">
            <Grid artists={topArtists.items.slice(0, 16)} />
          </Section>
        )}
        {topTracks && (
          <Section title="Recent top tracks" seeAllLink="/top-tracks">
            <TracksList tracks={topTracks.items.slice(0, 10)} />
          </Section>
        )}
        {playlists && (
          <Section title="Favorite Playlists" seeAllLink="/playlists">
            <PlaylistsGrid playlists={playlists.items.slice(0, 16)} />
          </Section>
        )}
      </main>
    </>
  )
}
