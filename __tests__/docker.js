'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');


describe('generator:docker', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/docker'))
        .withPrompts({
          port: 1234
        })
        .withOptions({
          projectName: "test-react-app",
          destinationRoot: "test-react-app/"
        });
    });

    it('creates files', () => {
      const expected = [
        'Dockerfile',
        'dev-compose.yml'
      ];

      assert.file(expected);
    });

    it('fills Dockerfile with correct information', () => {
      assert.fileContent('Dockerfile', 'RUN mkdir -p test-react-app');
      assert.fileContent('Dockerfile', 'WORKDIR /test-react-app');
    });

    it('fills dev-compose.yml with correct information', () => {
      assert.fileContent('dev-compose.yml', 'container_name: test-react-app');
      assert.fileContent('dev-compose.yml', 'image: test-react-app:dev');
      assert.fileContent('dev-compose.yml', '- .:/test-react-app');
      assert.fileContent('dev-compose.yml', '- /test-react-app/node_modules/');
      assert.fileContent('dev-compose.yml', '- "1234:1234"');
    });

  });
});
