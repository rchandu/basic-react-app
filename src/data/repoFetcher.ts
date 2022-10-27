import { useEffect, useState } from 'react';
import { IGithubRepo } from '../utils/DataTypes';
import { getOrgReposApi, getRepoDetailApi } from '../utils/utils';

const repoInfoMap: Map<string, IGithubRepo> = new Map();
const orgRepoListMap: Map<string, IGithubRepo[]> = new Map();
const responseCache: Map<string, any> = new Map();

function useFetchData<ReturnType>(fetchUrl: string) {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState<ReturnType | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    setIsFetching(true);
    console.log('Making the call');
    if (responseCache.has(fetchUrl)) {
      setData(responseCache.get(fetchUrl));
      setIsFetching(false);
    } else {
      fetch(fetchUrl)
        .then((res) => res.json())
        .then((data: ReturnType) => {
          responseCache.set(fetchUrl, data);
          setData(data);
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false));
    }
  }, [fetchUrl]);

  return [isFetching, data, error];
}

export const useFetchOrgRepos = (orgName: string) => {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState<IGithubRepo[] | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    setIsFetching(true);
    const existingData = orgRepoListMap.get(orgName);
    if (existingData) {
      setData(existingData);
      setIsFetching(false);
    } else {
      console.log('Making the call');
      fetch(getOrgReposApi(orgName))
        .then((res) => res.json())
        .then((data) => {
          orgRepoListMap.set(orgName, data);
          setData(data);
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false));
    }
  }, [orgName]);

  return [isFetching, data, error];
};

export const useFetchRepoDetail = (repoName: string) =>
  useFetchData<IGithubRepo>(getRepoDetailApi(repoName));
