import { Link } from 'react-router-dom';
import { IGithubRepo } from '../utils/DataTypes';

interface Props {
  repo: IGithubRepo;
}

export const RepoListItem: React.FC<Props> = ({ repo }) => {
  return (
    <div className="repoListItem">
      <div className="body">
        <div className="title">{repo.name}</div>
        <div className="stats">
          <div className="stars">{repo.stargazers_count ?? 0} ⭐</div>
          <span>|</span>
          <div className="openIssues">{repo.open_issues_count ?? 0} issues</div>
        </div>
        <div>Created on: {new Date(repo.created_at).toDateString()}</div>
      </div>
      <div className="actions">
        <a
          data-testid="repoLink"
          href={repo.html_url}
          target="_blank"
          className="actionItem"
        >
          Repo link
        </a>
        <Link
          className="actionItem"
          data-testid="detailLink"
          to={`/repo/${repo.full_name}`}
        >
          Repo details
        </Link>
      </div>
    </div>
  );
};
