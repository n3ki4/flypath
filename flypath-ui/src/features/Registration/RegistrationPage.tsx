import React, { ChangeEvent, useState } from 'react'
import { Box, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import lodash from 'lodash'

import { useUser } from '@hooks/use-user'

import { UserProfileCreation } from '@types-internal/user/user-profile-creation.type'

import '../../components/Button/Button.scss'

export const RegistrationPage = () => {
  const { register } = useUser()

  const [formData, changeFormData] = useState<UserProfileCreation>({
    email: '',
    password: ''
  })

  const onDataChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    changeFormData((prev: UserProfileCreation) => {
      const updated = lodash.cloneDeep(prev)
      lodash.set(updated, name, value)
      return updated
    })
  }

  const onRegistrationHandler = () => {
    register(formData)
  }

  return (
    <div className="login">
      <div className="login__main-text">Реєстрація</div>
      <Box component="form">
        <div className="login__input">
          <TextField
            className="field"
            name="email"
            fullWidth
            onChange={(e) => onDataChangeHandler(e)}
            value={formData.email}
            id="filled-basic"
            label="Email"
            variant="filled"
          />
        </div>
        <div className="login__input">
          <TextField
            className="field"
            name="identifier.firstName"
            fullWidth
            onChange={(e) => onDataChangeHandler(e)}
            value={formData.identifier?.firstName}
            id="filled-basic"
            label="Name"
            variant="filled"
          />
        </div>
        <div className="login__input">
          <TextField
            className="field"
            name="identifier.lastName"
            fullWidth
            onChange={(e) => onDataChangeHandler(e)}
            value={formData.identifier?.lastName}
            id="filled-basic"
            label="Surname"
            variant="filled"
          />
        </div>
        <div className="login__input">
          <TextField
            className="field"
            type="password"
            name="password"
            fullWidth
            onChange={(e) => onDataChangeHandler(e)}
            value={formData.password}
            id="filled-basic"
            label="Password"
            variant="filled"
          />
        </div>
        <button type="button" onClick={onRegistrationHandler} className="login__submit button">
          Зареєструватися
        </button>
        <div className="login__go-register">
          Вже маєте акаунт? Тоді
          <span>
            <Link to="/login">увійди!</Link>
          </span>
        </div>
      </Box>
    </div>
  )
}
