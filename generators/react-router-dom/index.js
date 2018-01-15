const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot)
  }

  writing() {
    this._writePackageJSON()
    this._writeTemplateFiles()
  }

  _writePackageJSON() {
    this.yarnInstall([
      'react-router-dom'
    ]);
  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('./**'),
      this.destinationPath('.')
    );
  }
}
