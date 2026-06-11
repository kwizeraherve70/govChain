import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routes = {
  '/': 'Home',
  '/Programs': 'Programs',
  '/AdminDashboard': 'Dashboard',
  '/about': 'About',
  // Admin routes
  '/Admin': 'Admin',
  '/Admin/Dashboard': 'Dashboard',
  '/Admin/Programs': 'Programs',
  '/Admin/Stocks': 'Stocks',
  '/Admin/Users': 'Users',
  // Leader routes
  '/Leader': 'Leader',
  '/Leader/Programs': 'Programs',
  '/Leader/Stocks': 'Stocks',
  // Citizen routes
  '/Citizens': 'Citizens',
  '/Citizens/Dashboard': 'Dashboard',
  '/Citizens/Programs': 'Programs',
  '/Citizens/Stocks': 'Pending Stocks',
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <ul className="flex items-center gap-2 text-sm flex-wrap">
      <li>
        <a href="/"
           className="text-white/40 hover:text-white transition-colors no-underline font-medium">
          Home
        </a>
      </li>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const routeName = routes[to] || value;

        return (
          <li key={to} className="flex items-center gap-2">
            <span className="text-white/20 text-xs">›</span>
            {isLast ? (
              <span className="gradient-text font-semibold">{routeName}</span>
            ) : (
              <a href={to}
                 className="text-white/40 hover:text-white transition-colors no-underline">
                {routeName}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumb;
