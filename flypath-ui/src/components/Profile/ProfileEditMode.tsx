import React, { ChangeEvent, FC, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/lab'
import { Box } from '@material-ui/core'

import { useUser } from '@hooks/use-user'

import { UserProfile } from '@types-internal/user/user-profile.type'

import './profile.scss'

type ProfileEditModeProps = {
  turnEditMode: (arg0: boolean) => void
}

export const ProfileEditMode: FC<ProfileEditModeProps> = ({ turnEditMode }) => {
  const { userProfile, update } = useUser()

  const [profileToEdit, changeProfileToEdit] = useState<UserProfile | null>(userProfile)

  const onDataChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    changeProfileToEdit((prev) => ({ ...prev, [name]: value } as UserProfile))
  }

  const onBirthdayChangeHandler = (date: Date | null) => {
    changeProfileToEdit((prev) => ({ ...prev, identifier: { ...prev?.identifier, birthday: date } } as UserProfile))
  }

  const updateProfile = () => {
    turnEditMode(false)
    if (profileToEdit) {
      update(profileToEdit)
    }
  }

  return (
    <Box className="profile__content__subcontent__form" component="form">
      <div className="profile__content__subcontent__form__input">
        <TextField
          className="field"
          name="username"
          fullWidth
          onChange={onDataChangeHandler}
          value={profileToEdit?.username}
          id="filled-basic"
          label="Username"
          variant="filled"
        />
      </div>
      <div className="profile__content__subcontent__form__input">
        <TextField
          className="field"
          name="identifier.firstName"
          fullWidth
          onChange={onDataChangeHandler}
          value={profileToEdit?.identifier?.firstName}
          id="filled-basic"
          label="Ім'я"
          variant="filled"
        />
      </div>
      <div className="profile__content__subcontent__form__input">
        <TextField
          className="field"
          name="identifier.lastName"
          fullWidth
          onChange={onDataChangeHandler}
          value={profileToEdit?.identifier?.lastName}
          id="filled-basic"
          label="Прізвище"
          variant="filled"
        />
      </div>
      <div className="profile__content__subcontent__form__date-input">
        <DatePicker
          label="Дата народження"
          inputFormat="MM/dd/yyyy"
          value={profileToEdit?.identifier?.birthday ?? null}
          onChange={onBirthdayChangeHandler}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className="profile__content__subcontent__form__input">Паспортні дані:</div>
      <div className="profile__content__subcontent__form__input">
        <TextField
          className="field"
          name="identifier.code"
          fullWidth
          onChange={onDataChangeHandler}
          value={profileToEdit?.identifier?.code}
          id="filled-basic"
          label="Код"
          variant="filled"
        />
      </div>
      <div className="profile__content__subcontent__form__input">
        <TextField
          className="field"
          name="identifier.publisher"
          fullWidth
          onChange={onDataChangeHandler}
          value={profileToEdit?.identifier?.publisher}
          id="filled-basic"
          label="Видавництво"
          variant="filled"
        />
      </div>

      <Button onClick={updateProfile} className="profile__content__subcontent__form__submit button">
        Зберегти
      </Button>
    </Box>
  )
}
