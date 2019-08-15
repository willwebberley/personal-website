import React from 'react'
import Link from 'gatsby-link'

import Layout from '../components/Layout/Layout.js';

import treadlIcon from '../images/treadl.png';
import triloIcon from '../images/trilo.png';
import dottyIcon from '../images/dotty.png';
import ssotoolsIcon from '../images/ssotools.png';

const ProjectsPage = () => {
  const projects = [
    {
      name: 'Trilo',
      logo: triloIcon,
      url: 'https://trilo.app',
      description: 'A platform for running clinical and non-clinical trials for research and product development.',
      availableFor: [
        { name: 'Web' }, { name: 'Android' }, { name: 'iOS' }
      ]
    },
    {
      name: 'Treadl',
      logo: treadlIcon,
      url: 'https://treadl.com',
      description: 'A webapp for managing, displaying, and backing-up weaving projects.',
      availableFor: [ { name: 'Web' } ]
    },
    {
      name: 'Dotty',
      logo: dottyIcon,
      url: 'https://dotty.cloud',
      description: 'A command-line tool and RESTful API for backing-up and storing dotfiles and configuration files.',
      availableFor: [ { name: 'Web' }, { name: 'macOS' }, { name: 'Linux' } ]
    },
    {
      name: 'SSO Tools',
      logo: ssotoolsIcon,
      url: 'https://sso.tools',
      description: 'A webapp for managing custom IdPs for testing and building out single sign-on and enterprise applications.',
      availableFor: [ { name: 'Web' } ]
    }
  ];
    
  
  return (
  <Layout>
    <h2>Projects</h2>

    {projects.map(p =>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{paddingRight: 20}}>
          <img src={p.logo} style={{width: 150}} />
        </div>
        <div>
          <h3><a href={p.url} target='_blank'>{p.name}</a></h3>
          <p>{p.description}</p>
          <h4>Available for</h4>
          <p>{p.availableFor && p.availableFor.map(a => a.name).join(', ')}</p>
        </div>
      </div>
    )}
    

  </Layout>
  )
}

export default ProjectsPage
