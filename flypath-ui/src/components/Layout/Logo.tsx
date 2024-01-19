import React from 'react'
import { Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'

import './layout.scss'
import logoImage from '../../assets/logo.svg'

const Logo = () => (
  <Grid className="logo" container justifyContent="space-evenly">
    <Grid className="logo__icon" item xs={12} md={6}>
      <span>
        <Link to="/">
          <img src={logoImage} alt="Україна FlyPath купити" />
        </Link>
      </span>
    </Grid>
    <Grid className="logo__text" item xs={12} md={6}>
      FlyPath
    </Grid>
  </Grid>
)

export default Logo
