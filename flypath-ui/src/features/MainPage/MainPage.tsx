import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Grid } from '@material-ui/core'

import { MainFilters } from '@components/MainFilters/MainFilters'
import { DestinationCard } from '@components/Destination/DestinationCard'

import { useDestination } from '@hooks/use-destination'

import plane from '../../assets/plain.svg'
import './main-page.scss'

export const MainPage = () => {
  const { destinations } = useDestination()

  useEffect(() => {
    document.title = 'Купити квитки FlyPath'
  }, [])

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Купити квитки FlyPath,
        Україна FlyPath купити,"
        />
        <meta
          name="keywords"
          content="Україна FlyPath купити,
        FlyPath Київ Одеса,
        FlyPath Львів Суми,"
        />
        <title>Купити квитки FlyPath</title>
      </Helmet>

      <MainFilters />
      <img className="main-page__plane" src={plane} alt="Купити квитки FlyPath" />

      <Grid container direction="column" justifyContent="space-between">
        <div className="main-page__content">
          <div className="main-page__text">Білети</div>
          {destinations.map((destination) => (
            <div className="main-page__ticket-container" key={destination.id}>
              <DestinationCard destination={destination} isBuyButtonNeeds />
            </div>
          ))}
        </div>
      </Grid>
    </>
  )
}
