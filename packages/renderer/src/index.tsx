import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './applications/App.js';

ReactDOM.render(
  (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ),
  document.getElementById('app'),
);

if (import.meta.hot) {
  import.meta.hot.accept();
}