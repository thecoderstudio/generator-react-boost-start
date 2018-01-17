const Generator = require('yeoman-generator');
const babylon = require("babylon");
const esformatter = require("esformatter");
const transform = require("transform-ast");


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
    // Write new template files
    this.fs.copyTpl(
      this.templatePath('**'),
      this.destinationRoot()
    );

    // Mutate store to include redux-persist code
    var store = this.fs.read(this.destinationPath('src/store/index.jsx'));
    var changedStore = this._includeReduxPersist(store);
    this.fs.write(this.destinationPath('src/store/index.jsx'),
      esformatter.format(changedStore.toString())
    );
  }

  _includeReduxPersist(unparsedCode) {
    const self = this;
    return transform(unparsedCode,
      {
        parser: babylon,
        sourceType: "module",
        plugins: ["jsx"]
      },
      function(node) {
        if (node.type === "VariableDeclaration" && node.source().includes("createStore")) {
          // Declare the persistor variable under the store variable declaration
          node.append("const persistor = persistStore(store);");
        } else if (node.type === "ReturnStatement") {
          node.update("return { persistor, store };")
        } else if (node.type === "Program") {
          self._injectImports(node);
        }
      }
    );
  }

  _injectImports(program) {
    const reduxImportIndex = program.body.findIndex(i => i.source.extra.rawValue === "redux");
    const reduxImport = program.body[reduxImportIndex];
    
    reduxImport.append("\nimport { persistStore, persistCombineReducers } from 'redux-persist'");
  }
}
