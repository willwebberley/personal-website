import React from "react";
import moment from 'moment';
import Link from "gatsby-link";

export default class Blog extends React.Component {

  render() {
    return (
      <div>
        <h2>Blog</h2>

        {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
          if (node.fields.slug.includes('/blog/')) {
            return (
              <div>
                <h3><Link to={node.fields.slug}>{node.frontmatter.title}</Link> <small>{moment(node.fields.date).format('D MMMM YYYY')}</small></h3>
                <p>{node.excerpt}</p>
              </div>
            );
          }
        })}

      </div>
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
