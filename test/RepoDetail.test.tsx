import { render } from '@testing-library/react';
import { mockGHResponse } from './mockData';
import { RepoDetail } from '../src/repo-detail/RepoDetail';

const [mockRepoItem] = mockGHResponse;

describe('RepoDetail component', () => {
  it('Should basic info', () => {
    const { getByText, getByTestId } = render(
      <RepoDetail repoDetail={mockRepoItem} />
    );
    expect(getByText(mockRepoItem.name)).toBeDefined();
    expect(getByText(mockRepoItem.full_name)).toBeDefined();
    expect(getByText(mockRepoItem.description)).toBeDefined();
    expect(getByTestId('key_forks_count').textContent).toBe(
      `${mockRepoItem.forks_count}`
    );
    expect(getByTestId('key_open_issues_count').textContent).toBe(
      `${mockRepoItem.open_issues_count}`
    );
    expect(getByTestId('key_watchers_count').textContent).toBe(
      `${mockRepoItem.watchers_count}`
    );
  });

  it('Should show owner avatar', () => {
    const { getByTestId } = render(<RepoDetail repoDetail={mockRepoItem} />);
    expect(getByTestId('key_owner')).toBeDefined();
    const ownerImage = getByTestId('owner_image');
    expect(ownerImage).toBeDefined();
    expect(ownerImage.getAttribute('src')).toBe(mockRepoItem.owner.avatar_url);
  });

  it('Should show Links', () => {
    const { getByText } = render(<RepoDetail repoDetail={mockRepoItem} />);
    expect(getByText(mockRepoItem.html_url)).toBeDefined();
  });

  it('verify snapshot', () => {
    const result = render(<RepoDetail repoDetail={mockRepoItem} />);
    expect(result).toMatchSnapshot();
  });
});
