import React from "react";
import moment from 'moment';
import Link from "gatsby-link";
import Helmet from 'react-helmet'

import Layout from '../../components/Layout/Layout.js';

export default class Blog extends React.Component {

  render() {
    return (
      <Layout>
        <Helmet title='Notes' />
        <h2 style={{fontFamily:'Courier, Monospace'}}><Link to='/'>~/</Link>notes</h2>

        {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
          if (node.fields.slug.includes('/notes/')) {
            return (
              <div>
                <h3><Link to={node.fields.slug}>{node.frontmatter.title}</Link> <small>{moment(node.fields.date).format('D MMMM YYYY')}</small></h3>
                <p>{node.excerpt}</p>
              </div>
            );
          } else return null;
        })}

      </Layout>
    );
  }
}

export const query = graphql`
  query IndexQuery {
   	allMarkdownRemark(sort: {fields: [fileAbsolutePath], order: DESC}){
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          excerpt
          fields {
            slug
            date
          }
        }
      }
    }
  }
`;
