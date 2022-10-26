import { IGithubRepo } from '../DataTypes';

interface Props {
  repo: IGithubRepo;
}

export const RepoListItem: React.FC<Props> = ({ repo }) => {
  return <div>{repo.name}</div>;
};
