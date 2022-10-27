import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchRepoDetail } from '../data/repoFetcher';
import { RepoDetail } from './RepoDetail';

const RepoDetailPage: React.FC = () => {
  const { owner = '', repoName = '' } = useParams();
  const fullRepoName = useMemo(() => `${owner}/${repoName}`, [owner, repoName]);
  const [isFetching, repoDetail, error] = useFetchRepoDetail(fullRepoName);

  if (isFetching) return <div>Fetching data ...</div>;
  if (error) return <div>Failed to load</div>;
  return <RepoDetail repoDetail={repoDetail} />;
};

export default RepoDetailPage;
