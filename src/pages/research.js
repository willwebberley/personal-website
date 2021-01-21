import React from 'react'
import Link from "gatsby-link";
import Helmet from 'react-helmet'

import Layout from '../components/Layout/Layout.js';

const ProjectsPage = () => {
  const outputs = [
    {
      name: 'Retweeting: A Study of Message-Forwarding in Twitter',
      date: '2011',
      journal: '2011 Workshop on Mobile and Online Social Networks',
      authors: 'W Webberley, S Allen, R Whitaker',
      url: 'https://ieeexplore.ieee.org/abstract/document/6060787/'
    },
    {
      name: 'Inferring the interesting tweets in your network',
      date: '2013',
      journal: '2013 International Conference on Cloud and Green Computing',
      authors: 'W Webberley, SM Allen, RM Whitaker',
      url: 'https://ieeexplore.ieee.org/abstract/document/6686092/',
    },
    {
      name: 'Conversational sensemaking',
      date: '2015',
      journal: 'Next-Generation Analyst III',
      authors: 'A Preece, W Webberley, D Braines',
      url: 'https://mysite.cs.cf.ac.uk/A.D.Preece/publications/download/spienga2015.pdf',
    },
    {
      name: 'Tasking the tweeters: Obtaining actionable information from human sensors',
      date: '2015',
      journal: 'Ground/Air Multisensor Interoperability, Integration, and Networking for Persistent ISR VI',
      authors: 'Alun Preece, Will Webberley, Dave Braines',
      url: 'http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.709.256&rep=rep1&type=pdf'
    },
    {
      name: 'SHERLOCK: Simple Human Experiments Regarding Locally Observed Collective Knowledge',
      date: '2015',
      journal: 'US Army Research Laboratory Aberdeen Proving Ground',
      authors: 'A Preece, W Webberley, D Braines, N Hu, T La Porta, E Zaroukian, et. al.'
    },
    {
      name: 'Retweeting beyond expectation: Inferring interestingness in Twitter',
      date: '2016',
      journal: 'Computer Communications',
      authors: 'WM Webberley, SM Allen, RM Whitaker',
      url: 'https://www.sciencedirect.com/science/article/pii/S0140366415002546',
    },
    {
      name: 'Human computer collaboration at the edge: Enhancing collective situation understanding with controlled natural language',
      date: '2016',
      authors: 'Alun David Preece, William Webberley, Dave Braines, Erin Zaroukian, Jonathan Bakdash',
      journal: '',
      url: 'orca.cf.ac.uk/93425/1/Preece_sherlock_iccrts2016.pdf'
    },
    {
      name: 'Conversational intelligence analysis',
      date: '2016',
      authors: 'A Toniolo, AD Preece, W Webberley, TJ Norman, P Sullivan, T Dropps',
      journal: '17th International Conference on Distributed Computing',
      url: 'http://orca.cf.ac.uk/91470/1/a42-toniolo.pdf',
    },
    {
      name: 'From open source communications to knowledge',
      date: '2016',
      authors: 'Alun Preece, Colin Roberts, David Rogers, Will Webberley, Martin Innes, Dave Braines',
      journal: 'Next-Generation Analyst',
      url: 'http://orca.cf.ac.uk/89374/1/ita_spie2016_v2.pdf'
    },
    {
      name: 'Automation Bias with a Conversational Interface',
      date: '2017',
      authors: 'Erin Zaroukian, Jonathan Z Bakdash, Alun Preece, Will Webberley',
      journal: 'IEEE International InterDisciplinary Conference on Cognitive Methods in Situation Awareness and Decision Support (CogSIMA)',
      url: 'https://dais-ita.org/sites/default/files/CogSIMA2017_170322.pdf',
    },
    {
      name: 'Conversational homes: a uniform natural language approach for collaboration among humans and devices',
      date: '2017',
      authors: 'Dave Braines, Nick O\'Leary, Anna Thomas, Daniel Harborne, Alun Preece, Will Webberley',
      journal: 'International Journal on Advances in Intelligent Systems',
      url: 'https://core.ac.uk/download/pdf/146501096.pdf'
    },
    {
      name: 'Conversational homes',
      date: '2017',
      authors: 'Nick O\'Leary, David Braines, Alun David Preece, William Webberley',
      journal: 'IARIA',
      url: 'http://orca.cf.ac.uk/99165/1/Conversational_homes_final.pdf'
    },
    {
      name: 'SHERLOCK: Experimental evaluation of a conversational agent for mobile information tasks',
      date: '2017',
      authors: 'Alun Preece, William Webberley, Dave Braines, Erin G Zaroukian, Jonathan Z Bakdash',
      journal: 'IEEE Transactions on Human-Machine Systems',
      url: 'https://ieeexplore.ieee.org/iel7/6221037/6340045/07936494.pdf'
    },
    {
      name: 'Sentinel: A codesigned platform for semantic enrichment of social media streams',
      date: '2017',
      authors: 'Alun Preece, Irena Spasić, Kieran Evans, David Rogers, William Webberley, Colin Roberts, Martin Innes',
      journal: 'IEEE Transactions on Computational Social Systems',
      url: 'https://ieeexplore.ieee.org/iel7/6570650/6780646/08232468.pdf'
    }
  ];
    
  return (
  <Layout>
    <Helmet title='Research'>
      <meta name="description" content="Research work papers and outputs" />
    </Helmet>
    <h2 style={{fontFamily:'Courier, Monospace'}}><Link to='/'>~/</Link>research</h2>
    <div style={{display:'grid', gridColumnGap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'}}>
      <div>
        <h3 style={{marginTop: 0}}>Projects</h3>
        <p>I have been involved in a number of research projects.</p>

        <h4>NIS/DAIS-ITA project</h4>
        <p>2014-2017. The <a href='https://en.wikipedia.org/wiki/DAIS-ITA' target='_blank' rel='noopener noreferrer'>ITA program</a> is a research project undertaken by a coalition between the UK MoD and US Army Research Labs, led by IBM. Whilst on this project I worked closely wth <a href='https://www.ibm.com/blogs/emerging-technology/' target='_blank' rel='noopener noreferrer'>IBM Emerging Technology</a> on Controlled English and machine task assignment - particularly the <a href='http://www.cenode.io/' target='_blank' rel='noopener noreferrer'>CENode library and engine</a>.</p>

        <h4>Inferring interestingness in online social networks</h4>
        <p>2010-2014. My PhD research resulted in a number of key academic outputs and <a href='http://orca.cf.ac.uk/68758/1/2014webberleywmphd.pdf' target='_blank' rel='noopener noreferrer'>my thesis</a>.</p>
      </div>

      <div>
        <h3 style={{marginTop: 0}}>Publications</h3>
        {outputs.reverse().map((o, i) =>
          <div key={i} style={{display: 'flex', flexDirection: 'row', marginBottom: 10, borderBottom: '1px solid rgb(250,250,250)'}}>
            <div>
              <h4 style={{marginTop:0}}><a href={o.url} target='_blank' rel='noopener noreferrer'>{o.name}</a></h4>
              <p style={{marginBottom:0, fontSize:15}}>{o.authors}</p>
              <p style={{fontSize: 13}}>{o.journal}, {o.date}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </Layout>
  )
}

export default ProjectsPage
