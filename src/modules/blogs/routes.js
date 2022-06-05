import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuardRoute } from '../../router';

const Blogs = React.lazy(() => import('./pages'));
const Blog = React.lazy(() => import('./pages/blog'));

const BlogRoutes = () => {
  return (
    <GuardRoute>
      <Routes>
        <Route index element={<Blogs />} />
        <Route path=':blogId' element={<Blog />} />
      </Routes>
    </GuardRoute>
  );
};

export default BlogRoutes;
