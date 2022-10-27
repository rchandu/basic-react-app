import { IGithubRepo, IRepoLicense, IRepoOwner } from '../utils/DataTypes';
import './repoDetail.css';

interface Props {
  repoDetail: IGithubRepo;
}

const renderLink = (val: string) => (
  <a href={val} target="_blank">
    {val}
  </a>
);
const rendYesNo = (val: boolean) => (val ? '✅' : '❌');

type GHKey = keyof IGithubRepo;
interface FieldAccessor {
  key: GHKey;
  label: string;
  accessorFn?: (val: any) => JSX.Element | string;
}
const FieldsToShow: FieldAccessor[] = [
  { key: 'name', label: 'Name' },
  {
    key: 'created_at',
    label: 'Created at',
    accessorFn: (val) => new Date(val).toLocaleString()
  },
  {
    key: 'updated_at',
    label: 'Updated at',
    accessorFn: (val) => new Date(val).toLocaleString()
  },
  { key: 'full_name', label: 'Full Name' },
  { key: 'description', label: 'Description' },
  { key: 'language', label: 'Language' },
  {
    key: 'owner',
    label: 'Owner',
    accessorFn: (owner: IRepoOwner) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img
          data-testid="owner_image"
          src={owner.avatar_url}
          height={40}
          width={40}
        />
        {`${owner.type} / ${owner.login}`}
        <a href={owner.html_url} target="_blank">
          &nbsp;(Link)
        </a>
      </div>
    )
  },
  {
    key: 'license',
    label: 'License',
    accessorFn: (license: IRepoLicense | null) => {
      if (!license) return '-';
      return (
        <div>
          {license.name}
          <a href={license.url} target="_blank">
            &nbsp;(Link)
          </a>
        </div>
      );
    }
  },
  { key: 'private', label: 'Is private', accessorFn: rendYesNo },
  { key: 'forks_count', label: 'Forks count' },
  { key: 'allow_forking', label: 'Allows forks', accessorFn: rendYesNo },
  { key: 'open_issues_count', label: 'Open issues' },
  { key: 'watchers_count', label: 'Watchers' },
  { key: 'has_wiki', label: 'Has wiki', accessorFn: rendYesNo },
  { key: 'has_downloads', label: 'Has downloads', accessorFn: rendYesNo },
  { key: 'has_pages', label: 'Has pages', accessorFn: rendYesNo },
  { key: 'has_projects', label: 'Has projects', accessorFn: rendYesNo },
  { key: 'archived', label: 'Is archived', accessorFn: rendYesNo },
  { key: 'disabled', label: 'Is disabled', accessorFn: rendYesNo },
  { key: 'html_url', label: 'URL', accessorFn: renderLink },
  { key: 'homepage', label: 'Home page', accessorFn: renderLink }
];

export const RepoDetail: React.FC<Props> = ({ repoDetail }) => {
  return (
    <table className="repoDetail">
      <tbody>
        {FieldsToShow.map((currField) => {
          const currFieldValue = repoDetail[currField.key];
          let valueEl = null;
          if (currFieldValue === undefined || currFieldValue === null) {
            valueEl = '-';
          } else if (currField.accessorFn) {
            valueEl = currField.accessorFn(currFieldValue);
          } else {
            valueEl = currFieldValue;
          }
          return (
            <tr key={currField.key}>
              <td>{currField.label}</td>
              <td data-testid={`key_${currField.key}`}>{valueEl}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
