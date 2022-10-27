import { useParams } from 'react-router-dom';
import { useFetchOrgRepos } from '../data/repoFetcher';
import { RepoList } from './RepoList';

const RepoListPage = () => {
  const { orgName = '' } = useParams();
  const [isFetching, orgRepos, error] = useFetchOrgRepos(orgName);

  if (isFetching) return <div>Fetching data ...</div>;
  if (error) return <div>Failed to load</div>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2>
        Organization repositories for <strong>{orgName}</strong>
      </h2>
      <RepoList repoList={orgRepos} />
    </div>
  );
};

export default RepoListPage;
