import React from 'react'

import { Grid } from '@material-ui/core'

import Logo from './Logo'
import './layout.scss'

const Footer = () => (
  <div className="layout__footer">
    <Grid container justifyContent="center" alignItems="center">
      <Grid className="layout__footer__block" item xs={12} md={6} lg={3}>
        <Logo />
      </Grid>
      <Grid className="layout__footer__block" item xs={12} md={6} lg={3}>
        Контакти
        <br />
        flypath@gmail.com
        <br />
        м. Київ, вул. Шолуденка, 3
        <br />
        +380504561833
      </Grid>
      <Grid className="layout__footer__block" item xs={12} md={6} lg={3}>
        Про компанію / Google-map
      </Grid>
      <Grid
        className="layout__footer__block layout__footer__politics"
        item
        xs={12}
        md={6}
        lg={3}
      >
        Політика конфіденційності
      </Grid>
      <Grid
        className="layout__footer__phrase"
        container
        item
        xs={12}
        justifyContent="center"
      >
        Made with
        <div className="layout__footer__phrase__heart" />
        by flyPath
      </Grid>
    </Grid>
  </div>
)

export default Footer
