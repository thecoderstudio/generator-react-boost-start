const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
  }

  writing() {
    this._writePackageJson();
  }

  _writePackageJson() {
    this.yarnInstall([
      'rxjs'
    ]);
  }
}
