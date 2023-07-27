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
    const commitsResponse = await githubAxios.get(commitsUrl);
    const languagesResponse = await githubAxios.get(
      repositoryResponse.data.languages_url
    );
    const commits = commitsResponse.data;

    const numberOfCommits = Array.isArray(commits) ? commits.length : 0;
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
