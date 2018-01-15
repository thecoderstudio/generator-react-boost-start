'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

const appCode = `\
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div></div>
    );
  }
}

export default App;
`;


describe('generator:styled-components', () => {
  describe('defaults', () => {
    beforeEach(() => {
      return helpers.run(path.join(__dirname, '../generators/styled-components'))
        .withOptions({
          destinationRoot: "test-react-app/"
        })
        .on('ready', (generator) => {
          generator.fs.write('test-react-app/src/App.jsx', appCode);
        });
    });

    it('fills App.jsx with correct information', () => {
      assert.fileContent('src/App.jsx', "import { ThemeProvider } from 'styled-components';");
      assert.fileContent('src/App.jsx', "const theme = {};");
      assert.fileContent('src/App.jsx', "<ThemeProvider theme={ theme }>");
      assert.fileContent('src/App.jsx', "</ThemeProvider>");
    });
  });
});
