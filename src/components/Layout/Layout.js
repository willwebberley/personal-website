import React from 'react'
import Helmet from 'react-helmet'

import Header from '../Header'
import './Layout.css'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet titleTemplate="%s | Will Webberley" defaultTitle="Will Webberley" />
    <Header />
    <div style={{margin: '0 auto',maxWidth: 960,padding: '0px 1.0875rem 1.45rem',paddingTop: 0}}>
      {children}

      <div style={{borderTop: '2px solid rgb(240,240,240)', paddingTop: 15, marginTop: 50}}>
        <span style={{fontSize: 11, fontFamily:'Courier, Monospace'}}>&copy; Will Webberley {(new Date()).getFullYear()}</span>
      </div>
    </div>
  </div>
)

export default TemplateWrapper
