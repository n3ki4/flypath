import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { userActionCreators } from '@store/user/user-action-creators'
import { StoreRootReducer } from '@store/root-reducer'

import { UserCredentials } from '@types-internal/user/user-credentials.type'

import { UserType } from '@enums/user-types.enum'
import { UserProfileCreation } from '@types-internal/user/user-profile-creation.type'
import { TemporaryChosenDestination } from '@types-internal/store/user/user-initial-state'
import { ticketActionCreators } from '@store/ticket/ticket-action-creators'

export const useUser = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const isAdminLogin = location.pathname.includes(UserType.ADMIN)

  const userProfile = useSelector((store: StoreRootReducer) => store.userReducer.profile)
  const destinationWithBookedSeats = useSelector((store: StoreRootReducer) => store.userReducer.temporaryChosenDestination)
  const userTickets = useSelector((store: StoreRootReducer) => store.ticketReducer.ticketList)

  const isAuth = useSelector((store: StoreRootReducer) => store.userReducer.isAuth)

  const login = useCallback((userLoginInfo: UserCredentials) => {
    dispatch(userActionCreators.login(userLoginInfo, isAdminLogin ? UserType.ADMIN : UserType.USER))
  }, [])

  const register = useCallback((profile: UserProfileCreation) => {
    dispatch(userActionCreators.register(profile))
  }, [])

  const logout = useCallback(() => {
    dispatch(userActionCreators.logOut())
  }, [])

  const update = useCallback((profile: UserProfileCreation) => {
    dispatch(userActionCreators.update(profile))
  }, [])

  const setDestinationWithSeats = useCallback((destinationWithBookedSeatsByUser: TemporaryChosenDestination | null) => {
    dispatch(userActionCreators.setTemporaryChosenDestination(destinationWithBookedSeatsByUser))
  }, [])

  const createTicketsForUser = useCallback(() => {
    dispatch(ticketActionCreators.createTickets(destinationWithBookedSeats))
  }, [])

  const getUserTicketList = useCallback(() => {
    dispatch(ticketActionCreators.loadTicketList())
  }, [])

  return {
    login,
    isAuth,
    userProfile,
    register,
    update,
    logout,
    setDestinationWithSeats,
    destinationWithBookedSeats,
    createTicketsForUser,
    userTickets,
    getUserTicketList
  }
}
