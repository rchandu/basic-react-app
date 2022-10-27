import { render } from '@testing-library/react';
import { mockGHResponse } from './mockData';
import { RepoDetail } from '../src/repo-detail/RepoDetail';

const [mockRepoItem] = mockGHResponse;

describe('RepoDetail component', () => {
  it('Should show name', () => {
    const { getByText } = render(<RepoDetail repoDetail={mockRepoItem} />);
    expect(getByText(mockRepoItem.name)).toBeDefined();
    expect(getByText(mockRepoItem.full_name)).toBeDefined();
    expect(getByText(mockRepoItem.description)).toBeDefined();
  });

  it('verify snapshot', () => {
    const result = render(<RepoDetail repoDetail={mockRepoItem} />);
    expect(result).toMatchSnapshot();
  });
});
