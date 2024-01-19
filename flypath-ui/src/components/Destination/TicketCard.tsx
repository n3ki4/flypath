import React from 'react'
import { Grid } from '@material-ui/core'
import moment from 'moment'

import { Ticket } from '@types-internal/ticket/ticket.type'

import planeTakeOff from '../../assets/plane-take-off.svg'
import './destination.scss'

type TicketCardProps = {
  ticket: Ticket
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const { start, end } = ticket

  const parsedStartTime = moment(start.date).format('hh:mm')
  const parsedStartDate = moment(start.date).format('ll')
  const parsedEndTime = moment(end.date).format('hh:mm')
  const parsedEndDate = moment(end.date).format('ll')

  return (
    <>
      <img className="destination-view__image" src={planeTakeOff} alt="FlyPath Київ Одеса" />
      <Grid className="destination-view" container>
        {/* time with destination info */}
        <Grid className="destination-view__main-info" container item lg={12} justifyContent="space-between">
          <Grid item xs={8}>
            <div className="destination-view__main-info__time">{parsedStartTime}</div>

            <div className="destination-view__main-info__destination">
              {ticket.start.city}
              <br />
              {`аеропорт "${ticket.start.aeroport.name}"`}
            </div>
            <div className="destination-view__main-info__date">{parsedStartDate}</div>
          </Grid>
          <Grid item xs={4}>
            <div className="destination-view__main-info__time">{parsedEndTime}</div>
            <div className="destination-view__main-info__destination">
              {ticket.end.city}
              <br />
              {`аеропорт "${ticket.end.aeroport.name}"`}
            </div>
            <div className="destination-view__main-info__date">{parsedEndDate}</div>
          </Grid>
        </Grid>

        {/* destination additional info with button to buy */}
        <Grid className="destination-view__additional-info" container item lg={12}>
          <Grid item xs={8}>
            <div className="destination-view__main-info__destination">{`Ім'я та Прізвище:  ${ticket.fullName}`}</div>
            <div className="destination-view__main-info__destination">{`Місце в літаку:  ${ticket.placeNumber}`}</div>
          </Grid>
          <Grid item xs={4}>
            <div className="destination-view__additional-info__buy-button">
              Ціна квитка {ticket.price} ₴
              <br />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
