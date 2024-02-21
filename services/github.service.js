import axios from "axios";
import getGitURI, { gitToken } from "../utils/api.constants.js";

const headers = {
  "user-agent": "node.js",
  Authorization: "token " + gitToken,
};

const getGitHubRepos = async (username) => {
  const githubResponse = await axios.get(getGitURI(username), { headers });
  // console.log(githubResponse.data);
  return githubResponse.data;
};

export default getGitHubRepos;
