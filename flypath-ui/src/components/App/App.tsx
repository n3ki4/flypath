import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { RegistrationPage } from '@features/Registration/RegistrationPage'
import { ProfilePage } from '@features/Profile/ProfilePage'
import { LoginPage } from '@features/Login/LoginPage'
import { MainPage } from '@features/MainPage/MainPage'
import { TicketOperationPage } from '@features/TicketOperation/TicketOperationPage'

import Layout from '@components/Layout/Layout'

import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <Layout>
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ticket/:id" element={<TicketOperationPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegistrationPage />} />
      </Routes>
    </>
  </Layout>
)

export default App
