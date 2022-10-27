import { useEffect, useState } from 'react';
import { IGithubRepo } from '../utils/DataTypes';
import { getOrgReposApi, getRepoDetailApi } from '../utils/utils';

const repoInfoMap: Map<string, IGithubRepo> = new Map();
const orgRepoListMap: Map<string, IGithubRepo[]> = new Map();

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
        .then((data: IGithubRepo[]) => {
          orgRepoListMap.set(orgName, data);
          data.forEach((x) => repoInfoMap.set(x.full_name, x));
          setData(data);
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false));
    }
  }, [orgName]);

  return [isFetching, data, error];
};
export const useFetchRepoDetail = (repoName: string) => {
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState<IGithubRepo | null>(null);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    setIsFetching(true);
    const existingData = repoInfoMap.get(repoName);
    if (existingData) {
      setData(existingData);
      setIsFetching(false);
    } else {
      console.log('Making the call');
      fetch(getRepoDetailApi(repoName))
        .then((res) => res.json())
        .then((data) => {
          repoInfoMap.set(repoName, data);
          setData(data);
        })
        .catch((err) => setError(err))
        .finally(() => setIsFetching(false));
    }
  }, [repoName]);

  return [isFetching, data, error];
};
