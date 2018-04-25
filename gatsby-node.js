const path = require(`path`)
const moment = require('moment');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === `MarkdownRemark`) {
    let slug = createFilePath({ node, getNode, basePath: `pages` });
    if (slug.indexOf('/blog/') > -1) {
      const dateSection = slug.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}-/g)[0];
      const newDateSection = dateSection.replace(/-/g, '/');
      slug = slug.replace(dateSection, newDateSection);
      boundActionCreators.createNodeField({
        node,
        name: 'slug',
        value: slug
      });
      boundActionCreators.createNodeField({
        node,
        name: 'date',
        value: moment.utc(newDateSection, 'YYYY/MM/DD/').format()
      });
    }
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: {fields: [fileAbsolutePath], order: DESC}) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
			result.data.allMarkdownRemark.edges.map(({ node }) => {
        const { slug } = node.fields;

        if (slug.indexOf('/blog/') > -1) {
          boundActionCreators.createPage({
            path: slug,
            component: path.resolve(`./src/templates/blog-post.js`),
            context: { slug }
          });
        }
        
      });
      resolve();
    })
  })
}
