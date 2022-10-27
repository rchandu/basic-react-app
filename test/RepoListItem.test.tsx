import { render } from './test-utils';
import { mockGHResponse } from './mockData';
import { RepoListItem } from '../src/repo-list/RepoListItem';

const mockRepoData = mockGHResponse[0];

describe('RepoListItem', () => {
  it('Should show name', () => {
    const { getByText } = render(<RepoListItem repo={mockRepoData} />);
    expect(getByText(mockRepoData.name)).toBeDefined();
  });

  it('verify snapshot', () => {
    const result = render(<RepoListItem repo={mockRepoData} />);
    expect(result).toMatchSnapshot();
  });
});
