'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');


describe('generator:redux', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/redux'))
        .withPrompts({
          reduxTechnologies: []
        })
        .withOptions({
          destinationRoot: "test-react-app/"
        });
    });

    it('creates files', () => {
      const expected = [
        'src/index.jsx',
        'src/actions/.keep',
        'src/reducers/index.jsx',
        'src/store/index.jsx'
      ];

      assert.file(expected);
    });
  });
});
