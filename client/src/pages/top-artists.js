import { useEffect, useState } from 'react'

import { getCurrentUserTopArtists } from '../spotify'

import { catchErrors } from '../utils'

import { Grid, Section } from '../components'

export const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null)
  const [activeRange, setActiveRange] = useState('short')

  useEffect(() => {
    const fetchTopArtists = async () => {
      const { data: topArtistsData } = await getCurrentUserTopArtists(
        `${activeRange}_term`
      )

      setTopArtists(topArtistsData)
    }

    catchErrors(fetchTopArtists())
  }, [activeRange])

  return (
    <>
      {topArtists && (
        <Section
          title="Top artists"
          breadcrumb={true}
          timeRangeButtons={true}
          timeRangeButtonOnClickFn={setActiveRange}
          activeRange={activeRange}
        >
          <Grid artists={topArtists.items} />
        </Section>
      )}
    </>
  )
}
