const getGitURI = (username) =>
  `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`;

export const gitToken = "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";

export default getGitURI;
