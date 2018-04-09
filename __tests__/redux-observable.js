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


describe('generator:redux-observable', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/redux-observable'))
        .withPrompts({
          'redux-observable': true
        })
        .withOptions({
          projectName: "test-react-app",
          destinationRoot: "test-react-app/"
        })
        .on('ready', (generator) => {
          generator.fs.write('src/store/index.jsx', storeCode);
        });
    });

    it('creates files', () => {
      const expected = [
        'src/epics/index.jsx'
      ];

      assert.file(expected);
    });

    it('fills store/index.jsx with correct information', () => {
      assert.fileContent('src/store/index.jsx', "import { createStore, applyMiddleware } from 'redux';");
      assert.fileContent('src/store/index.jsx', "import { createEpicMiddleware } from 'redux-observable';");
      assert.fileContent('src/store/index.jsx', "import epic from '../epics';");
      assert.fileContent('src/store/index.jsx', 'const epicMiddleware = createEpicMiddleware(epic);');
      assert.fileContent('src/store/index.jsx', "const store = createStore(");
      assert.fileContent('src/store/index.jsx', "state => state,");
      assert.fileContent('src/store/index.jsx', "applyMiddleware(epicMiddleware)");
    });
  });
});
