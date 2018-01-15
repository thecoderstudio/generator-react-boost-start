import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';

import reducer from '../reducers';


function configureStore() {
  const store = createStore(reducer);
  const persistor = persistStore(store);

  return { persistor, store };
}

export default configureStore;
