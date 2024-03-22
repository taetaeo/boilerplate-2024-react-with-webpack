import React from 'react';
import { RouterProvider } from 'react-router-dom';
// Configs
import routerConfig from '@configs/router.config';

const App = () => {
  return <RouterProvider router={routerConfig} />;
};

export default App;
