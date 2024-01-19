import React from 'react'
import { Grid } from '@material-ui/core'
import { DatePicker } from '@mui/lab'
import { TextField } from '@mui/material'

import { FilterOptions } from '@types-internal/filtration/filtration-options'

import { useFiltration } from '@hooks/use-filtration'

import './DateRange.scss'

export const DateRange = () => {
  const { destinationFilters, setDestinationFilters, setQueryParamsInURL } = useFiltration()

  const handleChangeStart = (chosenDate: Date | null) => {
    setQueryParamsInURL('date', chosenDate?.toISOString())
    if (chosenDate) {
      setDestinationFilters((prev: FilterOptions) => ({ ...prev, date: chosenDate }))
    }
  }

  return (
    <Grid className="date-range" container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <DatePicker
          label="Виліт"
          inputFormat="MM/dd/yyyy"
          value={destinationFilters.date}
          onChange={handleChangeStart}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
    </Grid>
  )
}
