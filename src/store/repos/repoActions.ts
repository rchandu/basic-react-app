import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGithubRepo } from '../../utils/DataTypes';
import { GH_API_ROOT } from '../../utils/utils';

export const fetchReposByOrganization = createAsyncThunk(
  'repoStore/fetchReposByOrganization',
  async (orgId: string) => {
    const res = await fetch(`${GH_API_ROOT}/orgs/${orgId}/repos`);
    if (res.ok) {
      const reposList = (await res.json()) as IGithubRepo[];
      return reposList;
    }
    throw new Error('Unable to fetch repositories');
  }
);
