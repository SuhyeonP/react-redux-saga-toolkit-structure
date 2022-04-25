import React from 'react';
import { Outlet } from 'react-router-dom';

function BaseLayout(): JSX.Element {
  return (
    <>
      <p>test</p>
      <Outlet />
    </>
  );
}

export default BaseLayout;
