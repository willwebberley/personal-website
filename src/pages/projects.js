import React from 'react'
import Link from "gatsby-link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import { faLinux, faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';

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
        { name: 'Web', icon: faLaptop }, { name: 'Android', icon: faAndroid, url: 'https://play.google.com/store/apps/details?id=app.trilo' }, { name: 'iOS', icon: faApple, url: 'https://itunes.apple.com/gb/app/trilo/id1460738681' }
      ]
    },
    {
      name: 'Treadl',
      logo: treadlIcon,
      url: 'https://treadl.com',
      description: 'A webapp for managing, displaying, and backing-up weaving projects.',
      availableFor: [ { name: 'Web', icon: faLaptop } ]
    },
    {
      name: 'Dotty',
      logo: dottyIcon,
      url: 'https://dotty.cloud',
      description: 'A command-line tool and RESTful API for backing-up and storing dotfiles and configuration files.',
      availableFor: [ { name: 'Web', icon: faLaptop }, { name: 'macOS', icon: faApple, url: 'https://dotty.cloud/#/documentation/quick-start' }, { name: 'Linux', icon: faLinux, url: 'https://dotty.cloud/#/documentation/quick-start' } ]
    },
    {
      name: 'SSO Tools',
      logo: ssotoolsIcon,
      url: 'https://sso.tools',
      description: 'A webapp for managing custom IdPs for testing and building out single sign-on and enterprise applications.',
      availableFor: [ { name: 'Web', icon: faLaptop } ]
    }
  ];
    
  
  return (
  <Layout>
    <h2 style={{fontFamily:'Courier, Monospace'}}><Link to='/'>~/</Link>projects</h2>
    <p>Some of the things I am currently working on.</p>
    {projects.map((p, i) =>
      <div key={i} style={{display: 'flex', flexDirection: 'row', marginBottom: 30, borderBottom: '1px solid rgb(250,250,250)'}}>
        <div style={{paddingRight: 30, paddingTop: 30}}>
          <img alt={p.name} src={p.logo} style={{width: 100}} />
        </div>
        <div>
          <h3><a href={p.url} target='_blank' rel='noopener noreferrer'>{p.name}</a></h3>
          <p>{p.description}</p>
          <p>{p.availableFor && p.availableFor.map((a, j) => 
            <a key={j} href={a.url || p.url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', marginRight: 15}}>{a.icon && <FontAwesomeIcon icon={a.icon} />} {a.name}</a>
          )}</p>
        </div>
      </div>
    )}
    

  </Layout>
  )
}

export default ProjectsPage
