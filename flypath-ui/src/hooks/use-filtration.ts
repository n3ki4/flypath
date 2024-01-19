import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { isArray, isString, set as lodashSet } from 'lodash'

import { StoreRootReducer } from 'store/root-reducer'

import { FilterOptions } from '@types-internal/filtration/filtration-options'
import { destinationActionCreators } from '@store/destination/destination-action-creators'
import { useDestination } from '@hooks/use-destination'

export const useFiltration = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const { debouncedDestinationListLoad } = useDestination()

  const isLoadingDestinations = useSelector((store: StoreRootReducer) => store.destinationReducer.isLoading)

  const [destinationFilters, setDestinationFilters] = useState<FilterOptions>({
    availableCount: 1,
    price: { min: 0, max: 17000 },
    date: null
  })

  const sendRequestForFilteringDestinations = () => {
    dispatch(destinationActionCreators.toggleLoading(true))
    debouncedDestinationListLoad()
  }

  const setQueryParamsInURL = (key: string, value?: string | null | string[]) => {
    const queryParams = new URLSearchParams(location.search)
    if (!value) {
      queryParams.delete(key)
    } else {
      if (isString(value)) {
        queryParams.set(key, value)
      }
      if (isArray(value)) {
        const urlArray = new URLSearchParams(value.map((s) => [key, s])).toString()
        queryParams.set(key, urlArray)
      }
    }

    navigate({
      pathname: '/',
      search: queryParams.toString()
    })
  }

  const getQueryParamsFromURL = () => {
    const queryParams = location.search.slice(1).split('&')

    const filtersFromURL = parseFilters(queryParams)

    setDestinationFilters((prev) => ({ ...prev, ...filtersFromURL }))
  }

  const parseFilters = (array: string[]): FilterOptions => {
    const filters: FilterOptions = {}
    array.forEach((item) => {
      const [key, value] = item.split('=')
      lodashSet(filters, key, value)
    })
    return filters
  }

  return {
    destinationFilters,
    setDestinationFilters,
    isLoadingDestinations,
    sendRequestForFilteringDestinations,
    getQueryParamsFromURL,
    setQueryParamsInURL
  }
}
