import React from 'react'
import Link from 'gatsby-link'

const Spacer = () => (
  <span style={{marginLeft: 8, marginRight: 8}}>-</span>
);

const Header = () => (
  <div style={{marginBottom: '1.45rem'}}>
    <div style={{textAlign: 'center', margin: '0 auto', maxWidth: 960, padding: '1.45rem 1.0875rem'}}>
      <h1>
        <Link to="/" style={{textDecoration: 'none', fontFamily:'Courier, Monospace'}}>
          <span role="img" aria-label="Live long">🖖</span> Will Webberley
        </Link>
      </h1>
      <p style={{fontFamily:'Courier, Monospace'}}>
        <Link to='/' activeClassName='active-link'>~/</Link><Spacer />
        <Link to='/projects' activeClassName='active-link'>projects</Link><Spacer />
        <Link to='/notes' activeClassName='active-link'>notes</Link><Spacer />
        <a href="https://twitter.com/willwebberley" target="_blank" rel="noopener noreferrer">twitter</a><Spacer />
        <a href="https://github.com/willwebberley" target="_blank" rel="noopener noreferrer">github</a>
      </p>
    </div>
  </div>
)

export default Header
