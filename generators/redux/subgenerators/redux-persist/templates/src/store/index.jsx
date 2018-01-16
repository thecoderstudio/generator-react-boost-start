import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';

import reducer from '../reducers';


function configureStore() {
  // Blank reducer, replace by imported root reducer when needed and remove this comment.
  const store = createStore(state => state);
  const persistor = persistStore(store);

  return { persistor, store };
}

export default configureStore;
