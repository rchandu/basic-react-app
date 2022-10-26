import { render } from '@testing-library/react';
import { mockGHResponse } from './mockData';
import { RepoList } from '../src/repo-list/RepoList';

const [mockRepoItem] = mockGHResponse;
const mockData = [
  mockRepoItem,
  {
    ...mockRepoItem,
    id: 9007,
    name: 'another-one',
    full_name: 'mine/another-name'
  }
];

describe('Test repo list item', () => {
  it('Should show name', () => {
    const { getByText } = render(<RepoList repoList={mockData} />);
    mockData.forEach((x) => {
      expect(getByText(x.name)).toBeDefined();
    });
  });

  it('verify snapshot', () => {
    const result = render(<RepoList repoList={mockData} />);
    expect(result).toMatchSnapshot();
  });
});
