import React from 'react'
import { TextField } from '@material-ui/core'

type CardFromComponentType = {}

const BankCard: React.FC<CardFromComponentType> = () => (
  <div className="ticket-operation__content__passport-form">
    <div className="ticket-operation__content__passport-form__row">
      <div className="ticket-operation__content__passport-form__row__x-8">
        <TextField className="field" name="card" fullWidth id="filled-basic" label="Номер карти" variant="filled" />
      </div>
      <div className="ticket-operation__content__passport-form__row__x-4">
        <TextField className="field" name="termin" fullWidth id="filled-basic" label="Строк дії" variant="filled" />
      </div>
    </div>
    <div className="ticket-operation__content__passport-form__row">
      <div className="ticket-operation__content__passport-form__row__x-8">
        <TextField
          className="field"
          name="fullname"
          fullWidth
          // onChange={onCardDataChangeHandler}
          // value={cardForm.fullname}
          id="filled-basic"
          label="ПІБ власника"
          variant="filled"
        />
      </div>
      <div className="ticket-operation__content__passport-form__row__x-4">
        <TextField
          className="field"
          name="cvv"
          fullWidth
          // onChange={onCardDataChangeHandler}
          // value={cardForm.cvv}
          id="filled-basic"
          label="Код CVV"
          variant="filled"
        />
      </div>
    </div>
  </div>
)

export default BankCard
