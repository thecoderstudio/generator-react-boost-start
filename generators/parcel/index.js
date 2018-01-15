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
      'parcel-bundler',
    ], { 'dev': true });

    const pkg = this.fs.readJSON(this.destinationPath('_package.json'));
    pkg["scripts"]["start"] = "node_modules/parcel-bundler/bin/cli.js src/index.html";
    pkg["scripts"]["build"] = "node_modules/parcel-bundler/bin/cli.js build src/index.html";
    this.fs.writeJSON(this.destinationPath('_package.json'), pkg);

  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('./**'),
      this.destinationPath('.'),
      {
        title: this.options.title
      }
    );
  }
}
