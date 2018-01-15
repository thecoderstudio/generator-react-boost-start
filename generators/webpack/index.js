const Generator = require('yeoman-generator');
const rename = require("gulp-rename");

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
      'html-webpack-plugin',
      'babel-core',
      'babel-loader',
      'webpack',
      'path'
    ]);
    this.yarnInstall(['webpack-dev-server'], { 'dev': true });

    const pkg = this.fs.readJSON(this.destinationPath('_package.json'));
    pkg["scripts"]["start"] = "webpack-dev-server --config config/webpack.config.js";
    pkg["scripts"]["build"] = "webpack --config config/webpack.config.js";
    this.fs.writeJSON(this.destinationPath('_package.json'), pkg);
  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot()
    );

  }
}
