import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BaseLayout from '~/src/component/atoms/layout/BaseLayout';

function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<p>test</p>} />
      </Route>
    </Routes>
  );
}

export default Router;
