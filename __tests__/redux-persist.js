'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const storeCode = `\
import { createStore } from 'redux';

import reducer from '../reducers';

function configureStore() {
  const store = createStore(reducer);

  return { store };
}

export default configureStore;
`;


describe('subgenerator:redux-persist', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/redux/subgenerators/redux-persist'))
        .withOptions({
          destinationRoot: "test-react-app/"
        })
        .on('ready', (generator) => {
          generator.fs.write('test-react-app/src/store/index.jsx', storeCode);
        });
    });

    it('creates files', () => {
      const expected = [
        'src/reducers/index.jsx'
      ];

      assert.file(expected);
    });

    it('fills store/index.jsx with correct information', () => {
      assert.fileContent('src/store/index.jsx', "import { persistStore, persistCombineReducers } from 'redux-persist';");
      assert.fileContent('src/store/index.jsx', "const persistor = persistStore(store);");
      assert.fileContent('src/store/index.jsx', "return {");
      assert.fileContent('src/store/index.jsx', "persistor,");
    });
  });
});
