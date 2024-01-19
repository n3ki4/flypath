import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { ProfileViewMode } from '@components/Profile/ProfileViewMode'
import { ProfileEditMode } from '@components/Profile/ProfileEditMode'
import { ProfileFavouriteCities } from '@components/Profile/ProfileFavouriteCities'

import { useUser } from '@hooks/use-user'

import './profile.scss'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
  const { isAuth, logout } = useUser()
  const navigate = useNavigate()

  const [editMode, setEditMode] = useState<boolean>(false)

  useEffect(() => {
    document.title = 'Сторінка профілю користувача FlyPath'
  }, [])

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])

  return (
    <div className="profile">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Купити квитки FlyPath, Україна FlyPath купити, FlyPath Київ Одеса, FlyPath Львів Суми, Придбати авіаквитки Україна, Авіалінії купити квиток Україна,
          Купити авіаквиток, Купити квиток на літак
        </title>
      </Helmet>
      <div className="profile__header">My profile</div>
      <div className="profile__content">
        {editMode ? <ProfileEditMode turnEditMode={setEditMode} /> : <ProfileViewMode turnEditMode={setEditMode} />}

        <ProfileFavouriteCities countries={['Київ', 'Львів', 'Харків']} />
      </div>
    </div>
  )
}
