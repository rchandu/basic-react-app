import { IGithubRepo } from '../utils/DataTypes';
import { RepoListItem } from './RepoListItem';
import './repolist.css';

interface Props {
  repoList: IGithubRepo[];
}

export const RepoList: React.FC<Props> = ({ repoList }) => {
  return (
    <div className="repoList">
      {repoList.map((repo) => (
        <RepoListItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
};
