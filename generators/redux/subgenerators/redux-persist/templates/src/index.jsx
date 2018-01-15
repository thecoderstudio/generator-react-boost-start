import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './store';


const { persistor, store } = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <PersistGate
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
, document.getElementById('app'));
