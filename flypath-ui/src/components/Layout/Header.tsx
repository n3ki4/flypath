import React from 'react'
import './layout.scss'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useLocalStorage } from '../../hooks/useLocalStorage'

const Header = () => {
  const [userToken] = useLocalStorage('userToken', null)

  return (
    <div className="layout__header">
      <div className="layout__header__my-profile_button">
        <span>
          <Link to={userToken ? '/profile' : '/login'}>Мій профіль</Link>
        </span>
      </div>
      <div className="layout__header__content">

        <Logo />

        <h1 className="layout__header__content__phrase">Plane tickets</h1>
      </div>
    </div>
  )
}

export default Header
