import React, { FC } from 'react'
import Header from './Header'
import Footer from './Footer'

import './layout.scss'
import '../Background/Background.scss'

type LayoutProps = {
  children: JSX.Element
}

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className="layout">
    <Header />

    <div className="layout__content">{children}</div>
    <Footer />
  </div>
)

export default Layout
