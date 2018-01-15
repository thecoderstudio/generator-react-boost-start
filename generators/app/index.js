const Generator = require('yeoman-generator');
const rename = require("gulp-rename");

module.exports = class extends Generator {
  default() {
    this.destinationRoot(this.destinationPath(this.options.projectName));

    if (this.options.bundler == 'Parcel') {
      this.composeWith(require.resolve('../parcel'), {
        title: this.options.title,
        destinationRoot: this.destinationRoot
      });
    } else if (this.options.bundler == 'Webpack') {
     this.composeWith(require.resolve('../webpack'), {
        title: this.options.title,
        destinationRoot: this.destinationRoot
      });
    }

    for (const key in this.options.technologies) {
      const technology = this.options.technologies[key]
      this.composeWith(require.resolve('../' + technology), {
        destinationRoot: this.destinationRoot,
        projectName: this.options.projectName
      });
    }

    if (this.options.technologies.includes('redux') &&
        this.options.technologies.includes('rxjs')) {
      this.composeWith(require.resolve('../redux-observable'), {
        destinationRoot: this.destinationRoot
      });
    }


    if (this.options.devops.includes('docker')) {
      this.composeWith(require.resolve('../docker'), {
        destinationRoot: this.destinationRoot,
        projectName: this.options.projectName
      });
    }
  }

  prompting() {
    return this.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Your project name"
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Your project description"
      },
      {
        type: "input",
        name: "title",
        message: "Your project title"
      },
      {
        type: "input",
        name: "author",
        message: "Author"
      },
      {
        type: "list",
        name: "bundler",
        message: "Choose a bundler",
        choices: ["Parcel", "Webpack"],
        default: 0,
      },
      {
        type: "checkbox",
        name: "technologies",
        message: "What else do you like to be included?",
        choices: ["react-router-dom", "redux", "rxjs", "styled-components"]
      },
      {
        type: "checkbox",
        name: "devops",
        message: "Do you want any devops tech to make your life easier?",
        choices: ["docker"]
      }
    ]).then((answers) => {
      this.options = answers
    });
  }

  writing() {
    this.registerTransformStream(rename(function(path) {
        path.basename = path.basename.replace(/(_)/g, '');
        path.dirname = path.dirname.replace(/(_)/g, '');
    }));
    this.fs.copyTpl(
      this.templatePath('./**'),
      this.destinationPath('.'),
      {
        name: this.options.projectName,
        description: this.options.projectDescription,
        title: this.options.title,
        author: this.options.author
      }
    );
  }
}
