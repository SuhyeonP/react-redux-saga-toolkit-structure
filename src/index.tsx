import React from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { globalStyles } from '~/src/globalStyles';
import Router from './router/Router';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter basename="/">
        <Global styles={globalStyles} />
        <Router />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
  rootElement,
);
