const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
  }

  writing() {
    this._writePackageJson();
    this._writeTemplateFiles();
  }

  _writePackageJson() {
    this.yarnInstall([
      'redux-persist'
    ]);
  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot()
    );
  }
}
