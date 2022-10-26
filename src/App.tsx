import React, { useState } from 'react';
import './App.css';

const RepoListPage = React.lazy(() => import('./repo-list/RepoListPage'));

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <RepoListPage />
    </div>
  );
}

export default App;
