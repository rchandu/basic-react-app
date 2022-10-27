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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2>Repo: {fullRepoName}</h2>
      <RepoDetail repoDetail={repoDetail} />
    </div>
  );
};

export default RepoDetailPage;
