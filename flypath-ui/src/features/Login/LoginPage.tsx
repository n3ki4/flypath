import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, TextField } from '@material-ui/core'
import { Button } from '@mui/material'

import { UserCredentials } from '@types-internal/user/user-credentials.type'

import { useUser } from '@hooks/use-user'

import '../../components/Button/Button.scss'
import './login.scss'

export const LoginPage = () => {
  const { isAuth, login } = useUser()
  const navigate = useNavigate()

  const [userCredentials, changeUserCredentials] = useState<UserCredentials>({ email: '', password: '' })

  useEffect(() => {
    if (isAuth) {
      navigate('/profile')
    }
  }, [isAuth])

  const onDataChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    changeUserCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const submitForm = () => login(userCredentials)

  return (
    <div className="login">
      <div className="login__main-text">Вхід</div>
      <Box component="form">
        <div className="login__input">
          <TextField
            className="field"
            name="email"
            fullWidth
            onChange={(e) => onDataChangeHandler(e)}
            value={userCredentials.email}
            id="filled-basic"
            label="Email"
            variant="filled"
          />
        </div>
        <div className="login__input">
          <TextField
            className="field"
            name="password"
            type="password"
            fullWidth
            onChange={(e) => onDataChangeHandler(e)}
            value={userCredentials.password}
            id="filled-basic"
            label="Password"
            variant="filled"
          />
        </div>
        <Button className="login__submit button" onClick={submitForm}>
          Увійти
        </Button>
        <div className="login__go-register">
          Немає профілю? Тоді
          <span>
            <Link to="/sign-up">зареєструйся!</Link>
          </span>
        </div>
      </Box>
    </div>
  )
}
