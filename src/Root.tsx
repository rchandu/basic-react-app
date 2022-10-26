import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';

const HomePage = React.lazy(() => import('./home/Home'));
const RepoListPage = React.lazy(() => import('./repo-list/RepoListPage'));

export function Root() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div>Loading bro</div>}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="/repos" element={<RepoListPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
}
