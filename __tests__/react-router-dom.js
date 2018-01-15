'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');


describe('generator:react-router-dom', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/react-router-dom'))
        .withOptions({
          destinationRoot: "test-react-app/"
        });
    });

    it('creates files', () => {
      const expected = [
        'src/App.jsx',
        'src/index.jsx',
        'src/pages/Home.jsx',
      ];

      assert.file(expected);
    });
  });
});
