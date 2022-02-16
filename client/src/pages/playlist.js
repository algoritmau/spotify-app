import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getPlaylistById, getTracksAudioFeatures } from '../spotify'

import axios from 'axios'
import { catchErrors } from '../utils'

import { Loader, Section, TracksList } from '../components'

import { StyledHeader } from '../styles'

export const Playlist = () => {
  const { id } = useParams()

  const [playlist, setPlaylist] = useState(null)
  const [tracksData, setTracksData] = useState(null)
  const [tracks, setTracks] = useState(null)
  const [audioFeatures, setAudioFeatures] = useState(null)
  const [sortValue, setSortValue] = useState('')
  const sortOptions = ['danceability', 'tempo', 'energy']

  useEffect(() => {
    const fecthPlaylistData = async () => {
      const { data: playlistData } = await getPlaylistById(id)

      setPlaylist(playlistData)
      setTracksData(playlistData.tracks)
    }

    catchErrors(fecthPlaylistData())
  }, [id])

  // When tracksData updates, compile array of tracks and audio features
  useEffect(() => {
    if (!tracksData) return

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state with the new tracks
    const refetchTracks = async () => {
      if (tracksData.next) {
        const { data } = await axios.get(tracksData.next)

        setTracksData(data)
      }
    }

    setTracks((tracks) => [...(tracks ? tracks : []), ...tracksData.items])

    catchErrors(refetchTracks())

    // Update the audio features state using the tracks' ids
    const fetchAudioFeatures = async () => {
      const ids = tracksData.items.map(({ track }) => track.id).join(',')
      const { data: audioFeaturesData } = await getTracksAudioFeatures(ids)

      setAudioFeatures((audioFeatures) => [
        ...(audioFeatures ? audioFeatures : []),
        ...audioFeaturesData.audio_features
      ])
    }

    catchErrors(fetchAudioFeatures())
  }, [tracksData])

  // Map over the tracks and add audio_features prop to each one
  // Memoize tracks to be accepted by TracksList component
  // and link each track to its audio features for sorting
  const tracksWithAudioFeatures = useMemo(() => {
    if (!tracks || !audioFeatures) return null

    return tracks.map(({ track }) => {
      const trackToAdd = track

      if (!track.audio_features) {
        const audioFeaturesObj = audioFeatures.find((item) => {
          if (!item || !track) return null

          return item.id === track.id
        })

        trackToAdd.audio_features = audioFeaturesObj
      }

      return trackToAdd
    })
  }, [tracks, audioFeatures])

  // Sort tracks by the selected sort value (audio feature)
  const sortedTracks = useMemo(() => {
    if (!tracksWithAudioFeatures) return null

    return [
      ...tracksWithAudioFeatures.sort((a, b) => {
        const aFeatures = a.audio_features
        const bFeatures = b.audio_features

        if (!aFeatures || !bFeatures) return false

        return bFeatures[sortValue] - aFeatures[sortValue]
      })
    ]
  }, [sortValue, tracksWithAudioFeatures])

  return (
    <>
      {playlist ? (
        <>
          <StyledHeader>
            <div className="header__content">
              {playlist.images.length && playlist.images[0].url && (
                <img
                  src={playlist.images[0].url}
                  alt="User Avatar"
                  className="profile__image"
                />
              )}
              <div className="profile__info">
                <h1 className="profile__info__title">Playlist</h1>
                <p className="profile__info__name">{playlist.name}</p>
                <p className="profile__info__details">
                  {playlist.followers.total ? (
                    <span>
                      {playlist.followers.total}{' '}
                      {`follower${playlist.followers.total !== 1 ? 's' : ''}`}
                    </span>
                  ) : null}
                  &nbsp;&nbsp;&middot;&nbsp;&nbsp;
                  <span>
                    {playlist.tracks.total}{' '}
                    {`song${playlist.tracks.total !== 1 ? 's' : ''}`}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
          <Section
            title="Playlist"
            breadcrumb={true}
            dropdown={true}
            dropdownOnChangeFn={setSortValue}
            dropdownOptions={sortOptions}
            isDropdownActive={!!sortValue}
          >
            {tracks && <TracksList tracks={sortedTracks} />}
          </Section>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}
