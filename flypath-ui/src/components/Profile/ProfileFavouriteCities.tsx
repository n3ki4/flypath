import React, { useEffect } from 'react'
import { Button } from '@mui/material'

import { useUser } from '@hooks/use-user'
import { TicketCard } from '@components/Destination/TicketCard'

type ProfileFavouriteCitiesType = {
  countries: Array<string>
}

export const ProfileFavouriteCities: React.FC<ProfileFavouriteCitiesType> = ({ countries }) => {
  const { logout, userTickets, getUserTicketList } = useUser()

  useEffect(() => {
    getUserTicketList()
  }, [])

  const myTickets = (
    <>
      {userTickets?.map((ticket) => (
        <div style={{ margin: '10px' }} key={ticket.id} className="profile__content__subcontent__form__content">
          <TicketCard ticket={ticket} />
        </div>
      ))}
    </>
  )

  return (
    <div className="profile__content__subcontent">
      <div className="profile__content__subcontent__form">
        <div className="profile__content__subcontent__form__subtitle">Улюблені міста:</div>
        <div className="profile__content__subcontent__form__content">{countries.join(', ')}</div>
      </div>
      <h3 style={{ textAlign: 'center' }}>Мої квитки:</h3>

      {myTickets}
      <div className="profile__content__subcontent__form">
        <Button onClick={logout} className="profile__content__subcontent__form__submit button">
          Вийти з аккаунту
        </Button>
      </div>
    </div>
  )
}
