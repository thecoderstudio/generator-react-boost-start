const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
  }

  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "port",
        message: "Which local port would you like to bind the container to by default?"
      }
    ]).then((answers) => {
      this.options["port"] = answers.port
    });
  }

  writing() {
    this._writeTemplateFiles();
  }

  _writeTemplateFiles() {
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot(),
      {
        projectName: this.options.projectName,
        port: this.options.port
      }
    );

  }
}
