import React from 'react'
import { Grid } from '@material-ui/core'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { Destination } from '@types-internal/destination/destination.type'

import planeTakeOff from '../../assets/plane-take-off.svg'
import './destination.scss'

type DestinationCardProps = {
  destination: Destination
  isBuyButtonNeeds: boolean
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, isBuyButtonNeeds }) => {
  const { start, end } = destination

  const parsedStartTime = moment(start.date).format('hh:mm')
  const parsedStartDate = moment(start.date).format('ll')
  const parsedEndTime = moment(end.date).format('hh:mm')
  const parsedEndDate = moment(end.date).format('ll')

  const getRequestedTicketsPrice = () => {
    if (destination.requestedNumberOfSeats) {
      return `${destination.price * destination.requestedNumberOfSeats} ₴`
    }
    return `${destination.price} ₴`
  }

  return (
    <>
      <img className="destination-view__image" src={planeTakeOff} alt="FlyPath Київ Одеса" />
      <Grid className="destination-view" container>
        {/* time with destination info */}
        <Grid className="destination-view__main-info" container item lg={12} justifyContent="space-between">
          <Grid item xs={8}>
            <div className="destination-view__main-info__time">{parsedStartTime}</div>
            <div className="destination-view__main-info__destination">
              {destination.start.city}
              <br />
              {`аеропорт "${destination.start.aeroport.name}"`}
            </div>
            <div className="destination-view__main-info__date">{parsedStartDate}</div>
          </Grid>
          <Grid item xs={4}>
            <div className="destination-view__main-info__time">{parsedEndTime}</div>
            <div className="destination-view__main-info__destination">
              {destination.end.city}
              <br />
              {`аеропорт "${destination.end.aeroport.name}"`}
            </div>
            <div className="destination-view__main-info__date">{parsedEndDate}</div>
          </Grid>
        </Grid>

        {/* destination additional info with button to buy */}
        <Grid className="destination-view__additional-info" container item lg={12}>
          <Grid item xs={8}>
            <div>{`Кількість пасажирів:  ${destination.requestedNumberOfSeats ?? '1'}`}</div>
            <div>В дорозі: 60 хвилин</div>
          </Grid>
          <Grid item xs={4}>
            {isBuyButtonNeeds ? (
              <Link to={`/ticket/${destination.id}`} className="destination-view__additional-info__buy-button">
                Купити за {getRequestedTicketsPrice()}
                <br />
              </Link>
            ) : (
              <div className="destination-view__additional-info__buy-button">
                Ціна за один квиток {destination.price} ₴
                <br />
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
