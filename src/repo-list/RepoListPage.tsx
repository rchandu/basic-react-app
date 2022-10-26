import useSWR from 'swr';
import { IGithubRepo } from '../DataTypes';
import { fetcher, REPO_LIST_API } from '../utils';
import { RepoList } from './RepoList';

const RepoListPage: React.FC = () => {
  const { data, error } = useSWR<IGithubRepo[], any>(REPO_LIST_API, fetcher, {
    suspense: true
  });

  if (error || !data) return <div>failed to load</div>;

  console.log(data);
  return <RepoList repoList={data} />;
};

export default RepoListPage;
