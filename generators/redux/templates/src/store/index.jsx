import { createStore } from 'redux';

import reducer from '../reducers';


function configureStore() {
  // Blank reducer, replace by imported root reducer when needed and remove this comment.
  const store = createStore(state => state);

  return { store };
}

export default configureStore;
