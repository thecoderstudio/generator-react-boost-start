import { createStore } from 'redux';

import reducer from '../reducers';


function configureStore() {
  const store = createStore(reducer);

  return { store };
}

export default configureStore;
