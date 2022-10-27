export const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export const GH_API_ROOT = 'https://api.github.com/';
export const REPO_LIST_API = `${GH_API_ROOT}/orgs/godaddy/repos`;

export const getOrgReposApi = (orgName: string) =>
  `${GH_API_ROOT}orgs/${orgName}/repos`;
export const getRepoDetailApi = (name: string) => `${GH_API_ROOT}repos/${name}`;
