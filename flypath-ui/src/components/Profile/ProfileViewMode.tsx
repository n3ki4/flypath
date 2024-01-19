import React, { FC } from 'react'
import { Button } from '@mui/material'

import { useUser } from '@hooks/use-user'

import './profile.scss'

type ProfileViewModeProps = {
  turnEditMode: (arg0: boolean) => void
}

export const ProfileViewMode: FC<ProfileViewModeProps> = ({ turnEditMode }) => {
  const { userProfile } = useUser()
  return (
    <div className="profile__content__subcontent">
      <div className="profile__content__subcontent__block">
        Username:
        <span>{userProfile?.username}</span>
      </div>
      <div className="profile__content__subcontent__block">
        Email:
        <span>{userProfile?.email}</span>
      </div>
      <div className="profile__content__subcontent__block">
        Ім`я:
        <span>{userProfile?.identifier?.firstName}</span>
      </div>
      <div className="profile__content__subcontent__block">
        Прізвище:
        <span>{userProfile?.identifier?.lastName}</span>
      </div>
      <div className="profile__content__subcontent__block">
        День народження:
        <span>{userProfile?.identifier?.birthday}</span>
      </div>
      <div className="profile__content__subcontent__block">Паспортні дані:</div>
      <div className="profile__content__subcontent__block">
        Код:
        <span>{userProfile?.identifier?.code}</span>
      </div>
      <div className="profile__content__subcontent__block">
        Видавництво:
        <span>{userProfile?.identifier?.publisher}</span>
      </div>
      <Button onClick={() => turnEditMode(true)} className="profile__content__subcontent__form__submit button">
        Відредагувати
      </Button>
    </div>
  )
}
