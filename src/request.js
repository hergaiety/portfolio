const axios = require('axios');

module.exports = async query => {
  let githubApiToken = process.env.GITHUB_API_TOKEN;
  if (!githubApiToken) {
    console.error('No process env GITHUB_API_TOKEN found.');
    return;
  }
  let axiosGithubGraphql = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${githubApiToken}`
    },
  });
  try {
    const result = await axiosGithubGraphql({
      url: '',
      method: 'post',
      data: {
        query,
      },
    });
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
