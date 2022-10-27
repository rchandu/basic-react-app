import { useEffect, useState } from 'react';
import { IGithubRepo } from '../utils/DataTypes';
import { getOrgReposApi, getRepoDetailApi } from '../utils/utils';

const repoInfoMap: Map<string, IGithubRepo> = new Map();
const orgRepoListMap: Map<string, IGithubRepo[]> = new Map();

function useFetchData<ReturnType>(fetchUrl: string) {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState<ReturnType | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    setIsFetching(true);
    console.log('Making the call');
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data: ReturnType) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  }, [fetchUrl]);

  return [isFetching, data, error];
}

export const useFetchOrgRepos = (orgName: string) =>
  useFetchData<IGithubRepo[]>(getOrgReposApi(orgName));

export const useFetchRepoDetail = (repoName: string) =>
  useFetchData<IGithubRepo>(getRepoDetailApi(repoName));
