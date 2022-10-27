import { IGithubRepo } from '../utils/DataTypes';
import { RepoListItem } from './RepoListItem';

interface Props {
  repoList: IGithubRepo[];
}

export const RepoList: React.FC<Props> = ({ repoList }) => {
  return (
    <ul className="list-decimal">
      {repoList.map((repo, index) => (
        <li key={repo.id}>
          <RepoListItem repo={repo} />
        </li>
      ))}
    </ul>
  );
};