const Generator = require('yeoman-generator');
const babylon = require("babylon");
const esformatter = require("esformatter");
const transform = require("transform-ast");

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
    esformatter.register(require('esformatter-jsx'));
  }

  writing() {
    this._writePackageJson();
    this._writeTemplateFiles();
  }

  _writePackageJson() {
    this.yarnInstall([
      'styled-components'
    ]);
  }

  _writeTemplateFiles() {
    var app = this.fs.read(this.destinationPath('src/App.jsx'));
    var changedApp = this._includeThemeProvider(app);
    this.fs.write(this.destinationPath('src/App.jsx'),
      esformatter.format(changedApp.toString())
    );
  }

  _includeThemeProvider(code) {
    const self = this;

    return transform(code,
      {
        parser: babylon,
        sourceType: "module",
        plugins: ["jsx"]
      },
      function(node) {
        if (node.type === "JSXElement") {
          // Wrap the existing HTML in <ThemeProvider> tags
          if (node.parent.type === "ReturnStatement"){
            node.prepend("<div>\n<ThemeProvider theme={theme}>\n");
            node.append("\n</ThemeProvider>\n</div>");
          }
        }

        // Create the theme variable above the class
        if (node.type === "ClassDeclaration") {
          node.prepend("const theme = {};\n\n");
        }

        // Add imports to the top of the file
        if (node.type === "Program") {
          const lastImportOccurence = self._getLastImportOccurence(node.body);
          lastImportOccurence.append("\nimport { ThemeProvider } from 'styled-components';\n");
        }
      }
    );
  }

  _getLastImportOccurence(programBody) {
    var lastImportOccurence;

    for (const i in programBody) {
      const component = programBody[i];
      if (component.type === "ImportDeclaration") {
        lastImportOccurence = component;
      }
    }

    return lastImportOccurence;
  }

}
