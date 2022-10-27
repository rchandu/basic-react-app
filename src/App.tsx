import React, { useMemo } from 'react';
import {
  Link, Outlet, useLocation, useNavigate
} from 'react-router-dom';
import './App.css';

interface Paths {
  label: string;
  path: string;
}

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const pathnameList: Paths[] = useMemo(() => {
    const pathName = location.pathname;
    if (pathName === '/') return [];
    if (pathName.includes('repos/')) {
      return [
        { label: 'Home', path: '/' },
        { label: 'Organization repos', path: pathName }
      ];
    }
    if (pathName.includes('repo/')) {
      return [
        { label: 'Home', path: '/' },
        { label: 'Repo Detail', path: pathName }
      ];
    }
    return [];
  }, [location]);

  return (
    <div className="app">
      <div className="navbar">
        {!isHome && (
          <Link to="" onClick={() => navigate(-1)}>
            ⬅
          </Link>
        )}
        {pathnameList.map((x, idx) => {
          const isLast = idx === pathnameList.length - 1;
          return (
            <React.Fragment key={x.path}>
              <Link to={x.path} key={x.path}>
                {x.label}
              </Link>
              {!isLast && <span>/</span>}
              {isLast}
            </React.Fragment>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
