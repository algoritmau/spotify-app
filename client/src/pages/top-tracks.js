import { useEffect, useState } from 'react'

import { getCurrentUserTopTracks } from '../spotify'

import { catchErrors } from '../utils'

import { Section, TracksList } from '../components'

export const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null)
  const [activeRange, setActiveRange] = useState('short')

  useEffect(() => {
    const fetchTopTracks = async () => {
      const { data: topTracksData } = await getCurrentUserTopTracks(
        `${activeRange}_term`
      )

      setTopTracks(topTracksData)
    }

    catchErrors(fetchTopTracks())
  }, [activeRange])

  return (
    <>
      {topTracks && (
        <Section
          title="Top tracks"
          breadcrumb={true}
          timeRangeButtons={true}
          timeRangeButtonOnClickFn={setActiveRange}
          activeRange={activeRange}
        >
          <TracksList tracks={topTracks.items} />
        </Section>
      )}
    </>
  )
}
