import { createBrowserRouter } from 'react-router-dom';

// layouts
import LayoutDefault from '@components/blocks/layouts/layoutDefault';
// Pages
import HomePage from '@components/pages/home/index.page';
import TestPage from '@components/pages/test/index.page';

export default createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      { path: '', element: <HomePage /> },
      { path: '/test', element: <TestPage /> },
    ],
  },
]);
