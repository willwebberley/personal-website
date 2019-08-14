import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div style={{marginBottom: '1.45rem'}}>
    <div style={{textAlign: 'center', margin: '0 auto', maxWidth: 960, padding: '1.45rem 1.0875rem'}}>
      <h1 style={{textAlign:'center'}}>
        <Link to="/" style={{textDecoration: 'none'}}>
          🖖 Will Webberley
        </Link>
      </h1>
      <p><Link to='/'>Home</Link> - <Link to='/notes'>Notes</Link> - <a href="https://twitter.com/willwebberley" target="_blank">Twitter</a> - <a href="https://github.com/willwebberley" target="_blank">GitHub</a></p>
    </div>
  </div>
)

export default Header
