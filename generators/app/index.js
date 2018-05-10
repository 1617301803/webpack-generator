'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const foldername = path.basename(process.cwd());

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the fine ${chalk.red('generator-webpack')} generator!`));

    const prompts = [
      // {
      //   type: 'confirm',
      //   name: 'someAnswer',
      //   message: 'Would you like to enable this option?',
      //   default: true
      // }
    ];

    return this.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: "What's the name of your application",
        default: foldername
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: "What's the description of your application(optional):"
      }
    ]).then(answers => {
      this.projectName = answers.projectName ? answers.projectName : foldername;
      this.projectDesc = answers.projectDesc ? answers.projectDesc : '';
    });
  }

  configuring() {
    this.config.set('projectName', this.projectName);
    this.config.set('projectDesc', this.projectDesc);
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      this
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this
    );

    this.fs.copy(
      this.templatePath('src/**'),
      this.destinationPath('src/'), this);


    this.fs.copy(
      this.templatePath('webpack.common.js'),
      this.destinationPath('webpack.prod.js'),
      this
    );

    this.fs.copy(
      this.templatePath('webpack.dev.js'),
      this.destinationPath('webpack.dev.js'),
      this
    );

    this.fs.copy(
      this.templatePath('webpack.prod.js'),
      this.destinationPath('webpack.prod.js'),
      this
    );
  }

  install() {
    this.installDependencies();
  }
};
