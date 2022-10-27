import { createSlice } from '@reduxjs/toolkit';
import { IGithubRepo } from '../../utils/DataTypes';
import { fetchReposByOrganization } from './repoActions';

interface IRepoStoreState {
  orgRepos: Record<string, IGithubRepo[]>;
  reposInfo: Record<string, IGithubRepo[]>;
}

const initialState: IRepoStoreState = { orgRepos: {}, reposInfo: {} };

export const repoSlice = createSlice({
  name: 'repoStore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReposByOrganization.pending, (state) => {});
  }
});
