const Generator = require('yeoman-generator');
const babylon = require("babylon");
const esformatter = require("esformatter");
const transform = require("transform-ast");

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.options.destinationRoot);
    esformatter.register(require('esformatter-jsx'));
  }

  prompting() {
    return this.prompt([
      {
        type: "confirm",
        name: "redux-observable",
        message: "You've selected both RxJS and Redux, would you like redux-observable to be included?"
      }
    ]).then((answers) => {
      this.options = answers;
    });
  }

  writing() {
    if (!this.options["redux-observable"]) {
      return;
    }
    this._writePackageJson();
    this._writeTemplateFiles();
  }

  _writePackageJson() {
    this.yarnInstall([
      'redux-observable'
    ]);
  }

  _writeTemplateFiles() {
    // Write new template files
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot()
    );

    // Mutate store to include redux-observable middleware
    var store = this.fs.read(this.destinationPath('src/store/index.jsx'));
    var changedStore = this._includeReduxObservable(store);
    this.fs.write(this.destinationPath('src/store/index.jsx'),
      esformatter.format(changedStore.toString())
    );
  }

  _includeReduxObservable(unparsedCode) {
    const self = this;
    return transform(unparsedCode,
      {
        parser: babylon,
        sourceType: "module",
        plugins: ["jsx"]
      },
      function(node) {
        if (node.type === "FunctionDeclaration") {
        // Add variable declaration above function declaration
          node.prepend("const epicMiddleware = createEpicMiddleware(epic);\n");
        } else if (node.type === "VariableDeclaration" && node.source().includes("createStore")) {
        // Replace the current store declaration with one that includes the epic middleware
          node.update(
          "const store = createStore(\n\
            state => state,\n\
            applyMiddleware(epicMiddleware)\n\
           );"
          );
        } else if (node.type === "Program") {
          self._injectImports(node);
        }
      }
    );
  }

  _injectImports(program) {
    const lastImportOccurence = this._getLastImportOccurence(program.body);
    const reduxImportIndex = program.body.findIndex(i => i.source.extra.rawValue === "redux");
    const reduxImport = program.body[reduxImportIndex];

    reduxImport.update("import { createStore, applyMiddleware } from 'redux';\n");
    reduxImport.append("import { createEpicMiddleware } from 'redux-observable';");
    lastImportOccurence.append("\nimport epic from '../epics';\n");
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
