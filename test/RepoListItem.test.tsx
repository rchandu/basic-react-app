import { render } from './test-utils';
import { mockGHResponse } from './mockData';
import { RepoListItem } from '../src/repo-list/RepoListItem';

const mockRepoData = mockGHResponse[0];

describe('RepoListItem', () => {
  it('Should show name', () => {
    const { getByText, getByTestId } = render(
      <RepoListItem repo={mockRepoData} />
    );
    expect(getByText(mockRepoData.name)).toBeDefined();
    expect(getByTestId('repoLink').getAttribute('href')).toBe(
      mockRepoData.html_url
    );
    expect(getByTestId('detailLink').getAttribute('href')).toBe(
      `/repo/godaddy/${mockRepoData.name}`
    );
  });

  it('verify snapshot', () => {
    const result = render(<RepoListItem repo={mockRepoData} />);
    expect(result).toMatchSnapshot();
  });
});
