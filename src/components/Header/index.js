import React from 'react'
import Link from 'gatsby-link'

const Header = () => (
  <div style={{marginBottom: '1.45rem'}}>
    <div style={{margin: '0 auto', maxWidth: 960, padding: '1.45rem 1.0875rem'}}>
      <h1>
        <Link to="/" style={{textDecoration: 'none'}}>
          🖖 Will Webberley
        </Link>
      </h1>
      <p><Link to='/blog'>Blog</Link> - <a href="https://twitter.com/flyingsparx" target="_blank">Twitter</a> - <a href="https://github.com/flyingsparx" target="_blank">GitHub</a></p>
    </div>
  </div>
)

export default Header
