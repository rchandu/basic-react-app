export const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(input, init);
  return res.json();
};

export const REPO_LIST_API = 'https://api.github.com/orgs/godaddy/repos';
