import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';

const HomePage = React.lazy(() => import('./home/Home'));
const RepoListPage = React.lazy(() => import('./repo-list/RepoListPage'));
const RepoDetailPage = React.lazy(() => import('./repo-detail/RepoDetailPage'));
const VideoPage = React.lazy(() => import('./video-page/VideoPage'));

export function Root() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<div>Loading bro</div>}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="/repos/:orgName" element={<RepoListPage />} />
              <Route
                path="/repo/:owner/:repoName"
                element={<RepoDetailPage />}
              />
            </Route>
            <Route path="/videos" element={<VideoPage />} />
            <Route
              path="*"
              element={
                <main style={{ padding: '1rem' }}>
                  <h1>Page Not Found</h1>
                  <p>There is nothing here!</p>
                </main>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
}
