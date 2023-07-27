// GithubService.ts
import axios from "axios";

const accessToken = process.env.REACT_APP_GITHUB_TOKEN;
const apiUrl = "https://api.github.com";

const githubAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `token ${accessToken}`,
  },
});

export const getRepositoryInfo = async (
  username: string,
  repositoryName: string
) => {
  try {
    const repositoryResponse = await githubAxios.get(
      `/repos/${username}/${repositoryName}`
    );
    const commitsUrl = repositoryResponse.data.commits_url.replace(
      "{/sha}",
      ""
    );

    //Fetch info from links
    const commitsResponse = await githubAxios.get(commitsUrl);
    const contributorsResponse = await githubAxios.get(
      repositoryResponse.data.contributors_url
    );
    const languagesResponse = await githubAxios.get(
      repositoryResponse.data.languages_url
    );

    //Extract info from links responses
    const commits = commitsResponse.data;
    const numberOfCommits = contributorsResponse.data[0].contributions;
    const lastCommitDate =
      Array.isArray(commits) && commits.length > 0
        ? commits[0].commit.author.date
        : null;

    return {
      full_name: repositoryResponse.data.full_name,
      commits: numberOfCommits,
      last_commit: lastCommitDate,
      languages: languagesResponse.data,
    };
  } catch (error) {
    console.error("Error fetching repository information", error);
    return null;
  }
};
