const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);

    if (this.options.reduxTechnologies.includes('redux-persist')) {
      this.composeWith(require.resolve('./subgenerators/redux-persist'), {
        destinationRoot: this.options.destinationRoot
      });
    }
  }

  prompting() {
    return this.prompt([
      {
        type: "checkbox",
        name: "reduxTechnologies",
        message: "Which Redux specific technologies would you like to be included?",
        choices: ["redux-persist"]
      }
    ]).then((answers) => {
      this.options = answers;
    });
  }

  writing() {
    this._writePackageJson();
    this._writeTemplateFiles();
  }

  _writePackageJson() {
    this.yarnInstall([
      'redux',
      'react-redux'
    ]);
  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot()
    );
    this.fs.copyTpl(
      this.templatePath('./**/.*'),
      this.destinationRoot()
    );
  }
}
