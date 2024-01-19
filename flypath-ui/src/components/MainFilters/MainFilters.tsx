import React, { ChangeEvent, useEffect } from 'react'
import lodash from 'lodash'
import { useLocation } from 'react-router-dom'
import { Grid, TextField } from '@material-ui/core'

import { useFiltration } from '@hooks/use-filtration'

import { DateRange } from '../DateRange/DateRange'

import './MainFilters.scss'

export const MainFilters = () => {
  const location = useLocation()
  const { setDestinationFilters, destinationFilters, sendRequestForFilteringDestinations, setQueryParamsInURL } = useFiltration()

  useEffect(() => {
    sendRequestForFilteringDestinations()
  }, [location.search])

  const onFiltersChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, id } = event.target
    setQueryParamsInURL(id, value)
    setDestinationFilters((prev) => {
      const updated = lodash.cloneDeep(prev)
      lodash.set(updated, name, value)
      return updated
    })
  }
  console.log('main filters', destinationFilters)
  return (
    <>
      <Grid className="main-filters" container direction="row" justifyContent="space-around" alignItems="center">
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            id="city_start"
            name="city.start"
            onChange={onFiltersChangeHandler}
            value={destinationFilters.city?.start}
            className="main-filters__field"
            label="Звідки"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <TextField
            id="city_end"
            name="city.end"
            onChange={onFiltersChangeHandler}
            value={destinationFilters.city?.end}
            className="main-filters__field"
            label="Куди"
            variant="standard"
          />
        </Grid>
        <Grid className="main-filters__field__date-range" item xs={12} md={12} lg={3}>
          <DateRange />
        </Grid>
        <Grid item xs={12} md={12} lg={3}>
          <TextField
            id="seats_count"
            name="availableCount"
            onChange={onFiltersChangeHandler}
            value={destinationFilters.availableCount}
            className="main-filters__field main-filters__field__passengers"
            label="Пасажири"
            variant="standard"
          />
        </Grid>
      </Grid>
    </>
  )
}
