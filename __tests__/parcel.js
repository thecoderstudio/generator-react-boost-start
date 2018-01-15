'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const pkg = '{"scripts":{}}';

describe('generator:parcel', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/parcel'))
        .withOptions({
          title: "test",
          destinationRoot: "test-react-app/"
        })
        .on('ready', (generator) => {
          generator.fs.write('test-react-app/_package.json', pkg);
        });
    });

    it('creates files', () => {
      const expected = [
        'src/index.html'
      ];

      assert.file(expected);
    });

    it('fills index.html with correct information', () => {
      assert.fileContent('src/index.html', '<title>test</title>');
      assert.fileContent('src/index.html', '<script src="index.jsx"></script>');
    });
  });
});
