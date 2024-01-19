import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

import { StoreRootReducer } from 'store/root-reducer'
import { destinationActionCreators } from '@store/destination/destination-action-creators'

export const useDestination = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { itemId } = useParams()

  const isLoading = useSelector((store: StoreRootReducer) => store.destinationReducer.isLoading)

  const destinationItem = useSelector((store: StoreRootReducer) => store.destinationReducer.item)

  const destinations = useSelector((store: StoreRootReducer) => store.destinationReducer.list)

  const loadDestinationList = () => {
    dispatch(destinationActionCreators.loadDestinationList(location.search))
  }

  const debouncedDestinationListLoad = useDebouncedCallback(() => {
    loadDestinationList()
  }, 700)

  const loadDestination = () => {
    if (itemId) {
      dispatch(destinationActionCreators.loadDestinationById(itemId))
    }
  }

  return {
    isLoading,
    destinationItem,
    destinations,
    debouncedDestinationListLoad,
    loadDestination
  }
}
