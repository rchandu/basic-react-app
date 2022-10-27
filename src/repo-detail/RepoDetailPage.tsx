import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IGithubRepo } from '../utils/DataTypes';
import { fetcher, getRepoDetailApi } from '../utils/utils';
import { RepoDetail } from './RepoDetail';

const RepoDetailPage: React.FC = () => {
  const { owner = '', repoName = '' } = useParams();
  const orgName = useMemo(() => `${owner}/${repoName}`, [owner, repoName]);
  console.log(orgName);
  const { data, error } = useSWR<IGithubRepo, any>(
    getRepoDetailApi(orgName),
    fetcher,
    { suspense: true }
  );

  if (error || !data) return <div>failed to load</div>;

  return <RepoDetail repoDetail={data} />;
};

export default RepoDetailPage;
