import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { IGithubRepo } from '../utils/DataTypes';
import { fetcher, getOrgReposApi } from '../utils/utils';
import { RepoList } from './RepoList';

const RepoListPage: React.FC = () => {
  const { orgName = '' } = useParams();
  const { data, error } = useSWR<IGithubRepo[]>(
    getOrgReposApi(orgName),
    fetcher,
    { suspense: true }
  );

  if (error || !data) return <div>failed to load</div>;

  console.log(data);
  return <RepoList repoList={data} />;
};

export default RepoListPage;
