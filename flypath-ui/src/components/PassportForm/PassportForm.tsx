import React, { ChangeEvent, useState } from 'react'
import { Autocomplete, DatePicker } from '@mui/lab'
import { TextField } from '@mui/material'
import { countries } from '@features/TicketOperation/helper'
import { useUser } from '@hooks/use-user'
import { useParams } from 'react-router-dom'
import lodash from 'lodash'
import { BookedSeat } from '@types-internal/ticket/seat.type'

type PassportComponentType = {
  seatCode: string
}

const PassportForm: React.FC<PassportComponentType> = ({ seatCode }) => {
  const params = useParams()

  const { setDestinationWithSeats, destinationWithBookedSeats } = useUser()
  const [ticketInfoSync, setTicketInfoSync] = useState<BookedSeat | null>(null)
  // setDestination(destinations.find((item) => item.id === params.id) as Destination)

  const handleCustomTicketFields = (name: string, value: unknown) => {
    onTicketRequesterChangeHandler({
      target: {
        name,
        value
      }
    } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
  }

  const onTicketRequesterChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    const ticketInfo = destinationWithBookedSeats?.seats.find((seat) => seat.seatCode === seatCode)

    if (ticketInfo) {
      lodash.set(ticketInfo, name, value)
      setTicketInfoSync(ticketInfoSync)
    }

    const updatedSeats = destinationWithBookedSeats?.seats.map((item) => {
      if (item.seatCode === ticketInfo?.seatCode) {
        return ticketInfo
      }
      return item
    })

    setDestinationWithSeats({
      destinationId: params.id ?? '',
      seats: updatedSeats ?? []
    })
  }

  return (
    <div className="ticket-operation__content__form">
      <div className="ticket-operation__content__form__input">
        <TextField
          className="field"
          name="firstName"
          fullWidth
          onChange={onTicketRequesterChangeHandler}
          value={ticketInfoSync?.firstName}
          id={seatCode}
          label="Ім'я"
          variant="filled"
        />
      </div>
      <div className="ticket-operation__content__form__input">
        <TextField
          className="field"
          name="lastName"
          fullWidth
          onChange={onTicketRequesterChangeHandler}
          value={ticketInfoSync?.lastName}
          id={seatCode}
          label="Прізвище"
          variant="filled"
        />
      </div>
      <div className="ticket-operation__content__form__date-input">
        <DatePicker
          key={seatCode}
          label="Дата видачі паспорта"
          inputFormat="MM/dd/yyyy"
          value={ticketInfoSync?.passportDate}
          onChange={(date) => handleCustomTicketFields('passportDate', date)}
          renderInput={(paramsDatePicker) => <TextField {...paramsDatePicker} />}
        />
      </div>
      <div className="ticket-operation__content__form__input">
        <TextField
          id={seatCode}
          className="field"
          name="passportNumber"
          fullWidth
          onChange={onTicketRequesterChangeHandler}
          value={ticketInfoSync?.passportNumber}
          label="Номер паспорта"
          variant="filled"
        />
      </div>
      <div className="ticket-operation__content__form__date-input">
        <DatePicker
          key={seatCode}
          label="Дійсний до"
          inputFormat="MM/dd/yyyy"
          value={ticketInfoSync?.passportAvailableToDate}
          onChange={(date) => handleCustomTicketFields('passportAvailableToDate', date)}
          renderInput={(paramsDatePicker) => <TextField {...paramsDatePicker} />}
        />
      </div>
      <div className="ticket-operation__content__form__auto-input">
        <Autocomplete
          id={seatCode}
          value={ticketInfoSync?.passportCountry}
          disablePortal
          options={countries}
          onChange={(country, value) => handleCustomTicketFields('passportCountry', value)}
          sx={{ width: 300 }}
          renderInput={(autoParams) => <TextField {...autoParams} label="Країна видачі паспорта" />}
        />
      </div>
      <div className="ticket-operation__content__form__input">
        {/* <FormGroup */}
        {/*  onChange={(event) => { */}
        {/*    console.log(ticketInfoSync) */}
        {/*  }} */}
        {/* > */}
        {/*  <FormControlLabel name="sex" value="male" control={<Checkbox checked={ticketInfoSync?.sex === 'male'} />} label="Чоловік" /> */}
        {/*  <FormControlLabel name="sex" value="female" control={<Checkbox checked={ticketInfoSync?.sex === 'female'} />} label="Жінка" /> */}
        {/* </FormGroup> */}
      </div>
    </div>
  )
}

export default PassportForm
