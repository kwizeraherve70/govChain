import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Route configuration
const routes = {
  '/': 'Home',
  '/Programs': 'Programs',
  '/AdminDashboard': 'Dashboard',
  '/about': 'About Us',
'/Admin/Programs/:id/Request': 'Requests'
};

const Breadcrumb = () => {
  const location = useLocation();
 
const pathnames = location.pathname.split('/').filter((x) => x);

  return (
      <ul className="flex space-x-4 w-full sm:w-1/2 md:w-auto">
        <li>
          <a href="/" className="text-black font-bold hover:underline">Home</a>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const routeName = routes[to] || value; // Fallback if route not in config

          return (
            <li key={to}>
              <span className="text-gray-600 dark:text-gray-300">&gt;</span>
              {isLast ? (
                <span className="text-gray-500">{routeName}</span>
              ) : (
                <a href={to} className="text-gray-600 hover:underline">{routeName}</a>
              )}
            </li>
          );
        })}
      </ul>
  );
};

export default Breadcrumb;