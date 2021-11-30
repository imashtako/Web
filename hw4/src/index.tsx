import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ToDo from "./todo/ToDo";
import { store } from './redux/store';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <ToDo />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

