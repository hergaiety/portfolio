module.exports = `{
  viewer {
    pinnedRepositories(last: 6) {
      edges {
        node {
          name
          updatedAt
          description
          url
          repositoryTopics(last: 12) {
            edges {
              node {
                topic {
                  name
                }
              }
            }
          }
          readme: object(expression: "master:README.md") {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  }
}`;
