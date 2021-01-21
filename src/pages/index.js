import React from 'react'
import Link from "gatsby-link";
import Helmet from 'react-helmet'

import Layout from '../components/Layout/Layout.js';
import Emoji from '../components/Emoji';

const IndexPage = () => (
  <Layout>
    <Helmet title='Home'>
      <meta name="description" content="Welcome to my website" />
    </Helmet>
    <h2 style={{fontFamily:'Courier, Monospace'}}>~/</h2>
    <p><Emoji n="Live long" e='🖖' /> Hello and welcome. I'm a tech lead/enthusiast and software engineer based in Wales, UK. I'm mainly interested in web and mobile technologies, containerisation and serverless, and IoT and automation.</p>

    <p><Emoji e='💡' /> Since 2016 I have been Chief Technology Officer at <a href="https://simplydo.co.uk" target="_blank" rel='noopener noreferrer'>Simply Do Ideas</a>, which provides a platform to help people to build and realise their innovations and entrepreneurial ideas. Before this I was a software engineer at <a href="https://www.chaserhq.com" target="_blank" rel='noopener noreferrer'>Chaser</a>.</p>

    <p><Emoji e='📦' /> I also work on and maintain a number of other <Link to='/projects'>projects</Link>.</p>

    <p><Emoji e='🤓' /> I completed <a href="https://github.com/willwebberley/thesis" target='noopener noreferrer'>my PhD</a> at <a href="http://cardiff.ac.uk" target="_blank" rel='noopener noreferrer'>Cardiff University</a>'s School of <a href="http://www.cardiff.ac.uk/computer-science" target="_blank" rel='noopener noreferrer'>Computer Science &amp; Informatics</a> (looking into the 'unfiltered feed' problem in online social networks), before going on to join the IBM-led UK MoD and US Army Research Labs coalition <a href="https://en.wikipedia.org/wiki/NIS-ITA" target="_blank" rel='noopener noreferrer'>ITA project</a> as a postdoctoral research associate. Whilst there, I also lectured the Advanced Computer Science MSc module <i><a href="https://github.com/willwebberley/CMT111" target="_blank" rel='noopener noreferrer'>Web &amp; Social Computing</a></i> and the Computer Science BSc module <i><a href="https://github.com/willwebberley/CM2101" target="_blank" rel='noopener noreferrer'>Human-Computer Interaction</a></i>.</p>
  
    <p><Emoji n="Coding" e='👨‍💻' /> Some of my research publications are <Link to='/research'>available here</Link>.</p>
  </Layout>
)

export default IndexPage
