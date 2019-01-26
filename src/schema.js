module.exports = `{
  viewer {
    pinnedRepositories(last: 6) {
      edges {
        node {
          name
          description
          url
          updatedAt
          repositoryTopics(last: 5) {
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
