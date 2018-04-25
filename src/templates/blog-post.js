import React from "react";
import moment from 'moment';
import Link from 'gatsby-link';

export default class BlogPost extends React.Component {

  render() {
    const post = this.props.data.markdownRemark;
    return (
      <div>
          <h4><Link to='/blog/'>More posts</Link></h4>
          <h2>{post.frontmatter.title}</h2>
          <h4>{moment(post.fields.date).format('D MMMM YYYY')} <i><small>({moment(post.fields.date).fromNow()})</small></i></h4>
          <article className='post'>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </article>
          <div className='ui hidden clearing divider'></div>
      </div>
    );
  }
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
      fields {
        date
      }
    }
  }
`;
