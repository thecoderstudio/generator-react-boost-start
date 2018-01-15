'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');


describe('generator:app', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          projectName: "test-react-app",
          projectDescription: "A react app",
          title: "test",
          author: "sample@coderstudio.nl",
          technologies: [],
          devops: []
        });
    });

    it('creates files', () => {
      const expected = [
        '.babelrc',
        'package.json',
        'src/package.json',
        'src/App.jsx',
        'src/index.html',
        'src/index.jsx'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      assert.JSONFileContent('package.json', {
        name: "test-react-app",
        description: "A react app",
        author: "sample@coderstudio.nl"
      });
    });

    it('fills index.html with correct information', () => {
      assert.fileContent('src/index.html', '<title>test</title>');
    });
  });
});
