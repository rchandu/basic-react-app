import { Outlet } from 'react-router-dom';
import './App.css';

export const App = () => {
  return (
    <div className="app">
      {/* <div className="navbar" /> */}
      <Outlet />
    </div>
  );
};
