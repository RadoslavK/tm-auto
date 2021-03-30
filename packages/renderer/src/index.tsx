import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './applications/App.js';

const appElement: JSX.Element = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootNode = document.getElementById('app');

if (!rootNode) {
  throw new Error('Did not find app root node');
}

enum Mode {
  Blocking,
  Concurrent,
}

const mode = Mode.Blocking;

if (mode === Mode.Blocking) {
  ReactDOM.render(appElement, rootNode);
} else {
  ReactDOM.unstable_createRoot(rootNode).render(appElement);
}

if (import.meta.hot) {
  import.meta.hot.accept();
}