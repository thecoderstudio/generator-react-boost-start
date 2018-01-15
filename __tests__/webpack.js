'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const pkg = '{"scripts":{}}';

describe('generator:webpack', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/webpack'))
        .withOptions({
          destinationRoot: "test-react-app/"
        })
        .on('ready', (generator) => {
          generator.fs.write('test-react-app/_package.json', pkg);
        });
    });

    it('creates files', () => {
      const expected = [
        'config/webpack.config.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', () => {
      assert.JSONFileContent('_package.json', {
        scripts: {
          start: "webpack-dev-server --config config/webpack.config.js"
        }
      });
    });
  });
});
