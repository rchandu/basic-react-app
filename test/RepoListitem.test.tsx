import { render } from '@testing-library/react';
import { mockGHResponse } from '../src/mockData';
import { RepoListItem } from '../src/repo-list/RepoListItem';

const mockRepoData = mockGHResponse[0];

describe('Test repo list item', () => {
  it('Should show name', () => {
    const { getByText } = render(<RepoListItem repo={mockRepoData} />);
    expect(getByText(mockRepoData.name)).toBeDefined();
  });

  it('verify snapshot', () => {
    const result = render(<RepoListItem repo={mockRepoData} />);
    expect(result).toMatchSnapshot();
  });
});
