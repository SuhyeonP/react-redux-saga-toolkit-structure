import React from 'react';
import { Outlet } from 'react-router-dom';

function BaseLayout(): JSX.Element {
  return (
    <>
      <Outlet />
    </>
  );
}

export default BaseLayout;
