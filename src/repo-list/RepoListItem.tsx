import { Link } from 'react-router-dom';
import { IGithubRepo } from '../utils/DataTypes';

interface Props {
  repo: IGithubRepo;
}

export const RepoListItem: React.FC<Props> = ({ repo }) => {
  return (
    <div>
      <div>{repo.name}</div>
      <div>{repo.full_name}</div>
      <Link to={`/repo/${repo.full_name}`} className="subtitle">
        Show repo info
      </Link>
    </div>
  );
};
