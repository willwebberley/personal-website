import React from 'react'
import Link from "gatsby-link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import { faLinux, faApple, faAndroid, faGithub } from '@fortawesome/free-brands-svg-icons';

import Layout from '../components/Layout/Layout.js';

import treadlIcon from '../images/treadl.png';
import trialflareIcon from '../images/trialflare.png';
import dottyIcon from '../images/dotty.png';
import ssotoolsIcon from '../images/ssotools.png';

const ProjectsPage = () => {
  const projects = [
    {
      name: 'Trialflare',
      logo: trialflareIcon,
      url: 'https://trialflare.com',
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
      availableFor: [ { name: 'Web', icon: faLaptop }, { name: 'macOS', icon: faApple, url: 'https://dotty.cloud/documentation/quick-start' }, { name: 'Linux', icon: faLinux, url: 'https://dotty.cloud/documentation/quick-start' } ]
    },
    {
      name: 'SSO Tools',
      logo: ssotoolsIcon,
      url: 'https://sso.tools',
      description: 'A webapp for managing custom IdPs for testing and building out single sign-on and enterprise applications.',
      availableFor: [ { name: 'Web', icon: faLaptop } ]
    }
  ];

  const otherProjects = [
    {
      name: 'Gower Tides',
      description: 'An Android app for displaying daily tidal patterns, along with weather and surf conditions, for the sea around the Gower Peninsula in South Wales. The app was aimed at surfers and other sea-users, and was available for several years on Google Play, but is now discontinued.',
      source: 'https://github.com/willwebberley/GowerTides'
    },
    {
      name: 'NZone Finder',
      description: 'An Android app for locating nearby public hotspots for Nintendo 3DS network services (e.g. StreetPass and SpotPass) on a convenient map. The project is now discontinued and is no longer available on Google Play.',
      source: 'https://github.com/willwebberley/NZone-finder'
    },
    {
      name: 'Patients, Please',
      description: 'Built as part of a team at the 2016 NHS Hackathon, this game is inspired by the indie game "Papers, Please", and is set in an emergency ward in a hospital. The game (Unity frontend and Python backend) was designed to highlight the stress and toll placed on clinicians working in such wards, with players needing to manage queuing, triage, bed space, progressive illnesses, and more. We won the Patient Involvement Award.',
    },
    {
      name: 'WekaGo',
      description: 'A Go wrapper for the Weka machine-learning toolkit - supporting a number of basic classification tasks. The source is still available and usable, but has not been maintained in some time.',
      source: 'https://github.com/willwebberley/WekaGo',
    },
    {
      name: 'WekaPy',
      description: 'Like WekaGo, except for Python instead of Go.',
      source: 'https://github.com/willwebberley/WekaPy',
    },
    {
      name: 'Health Explorer Wales',
      description: 'This project was undertaken as part of a team at the 2015 NHS Hackathon, and comprised a webapp that would attempt to automatically visualise available health and demographic data. For example, maps, timeseries, charts, etc. in order to make public data more accessible.'
    },
    {
      name: 'CasaStream',
      description: 'A project that supported simultaneous audio output (e.g. for music) across devices on a network. The project hooked into PulseAudio and made uss of RTP to broadcast sound to low-powered devices (such as a Raspberry Pi). Whilst I used to use this fairly frequently, the project is no longer being maintained.',
      source: 'https://github.com/willwebberley/CasaStream'
    }
  ];
  
  return (
  <Layout>
    <h2 style={{fontFamily:'Courier, Monospace'}}><Link to='/'>~/</Link>projects</h2>
    <div style={{display:'grid', gridColumnGap: 20, gridTemplateColumns: '1fr 1fr'}}>
      <div>
        <p>Some of the things I am currently working on. Please <a href='https://twitter.com/willwebberley' target='_blank' rel='noopener noreferrer'>get in touch</a> if you are interested in finding out more about these (or if you'd like to help out or get involved!).</p>
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
      </div>
      <div>
        <p>Some previous projects and open-sourced bits.</p>
        {otherProjects.map((p, i) => 
          <div key={i}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
              {p.source && <a href={p.source} target='_blank' rel='noopener noreferrer'><span><FontAwesomeIcon icon={faGithub} /> Project home</span></a>}
          </div>
        )}
      </div>
    </div>
  </Layout>
  )
}

export default ProjectsPage
