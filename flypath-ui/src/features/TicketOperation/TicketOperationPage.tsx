import React, { useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'

import PassportComponent from '@components/PassportForm/PassportForm'
import AirplaneModel from '@components/AirplaneModel/AirplaneModel'
import { DestinationCard } from '@components/Destination/DestinationCard'

import './ticket-operation.scss'
import { useDestination } from '@hooks/use-destination'
import { Destination } from '@types-internal/destination/destination.type'
import { useUser } from '@hooks/use-user'
import BankCard from '@components/BankCard/BankCard'
import { Button } from '@mui/material'

export const TicketOperationPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { userProfile, destinationWithBookedSeats } = useUser()

  useEffect(() => {
    document.title = 'Сторінка обрання квитка FlyPath'
  }, [])

  const { destinations } = useDestination()
  const { createTicketsForUser } = useUser()
  const [destination, setDestination] = useState<Destination>()

  useEffect(() => {
    setDestination(destinations.find((item) => item.id === params.id) as Destination)
  }, [params.id])

  const payForTickets = () => {
    createTicketsForUser()
    navigate({
      pathname: '/profile'
    })
  }

  const getRequestedTicketsPrice = () => {
    if (destination && destinationWithBookedSeats?.seats) {
      return `${destination.price * destinationWithBookedSeats.seats.length} ₴`
    }
    return `${destination?.price} ₴` ?? ''
  }

  return (
    <div className="ticket-operation">
      <Helmet>
        <meta
          name="description"
          content="Купити квитки FlyPath,
        Україна FlyPath купити,"
        />
        <meta
          name="keywords"
          content="Придбати авіаквитки Україна,
        Авіалінії купити квиток Україна,"
        />
        <title>Купити квитки FlyPath</title>
      </Helmet>
      <div className="ticket-operation__ticket-view">{destination && <DestinationCard destination={destination} isBuyButtonNeeds={false} />}</div>

      <div className="ticket-operation__choose-seat">
        <div className="ticket-operation__choose-seat__airplane-model">{destination && <AirplaneModel destination={destination} />}</div>
      </div>
      <div className="ticket-operation__content">
        <span>Заповніть персональну інформацію для купівлі квитка:</span>
        {destinationWithBookedSeats?.seats.map((item) => (
          <span key={item.seatCode}>
            <PassportComponent seatCode={item.seatCode} />
          </span>
        ))}
      </div>

      <div className="ticket-operation__content">
        <span>Здійсніть оплату через інтернет банкінг:</span>
        <BankCard />
      </div>
      <div className="ticket-operation__small-form">
        <div className="ticket-operation__small-form__input">
          <TextField
            className="field"
            name="email"
            fullWidth
            // onChange={(e) => onPassportDataChangeHandler(e)}
            value={userProfile?.email}
            id="filled-basic"
            label="Email"
            variant="filled"
          />
        </div>
        <div className="ticket-operation__small-form__input">
          <TextField
            className="field"
            name="phone"
            fullWidth
            // onChange={(e) => onPassportDataChangeHandler(e)}
            value={userProfile?.phone}
            id="filled-basic"
            label="Телефон"
            variant="filled"
          />
        </div>
      </div>
      <div className="ticket-operation__content__submit">
        <Button className="ticket-operation__content__form__submit button" onClick={payForTickets}>
          Оплатити - {getRequestedTicketsPrice()}
        </Button>
      </div>
    </div>
  )
}
