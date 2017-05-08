const Generator = require('yeoman-generator')
const fs = require('fs-extra')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    // This makes `appname` a required argument.
    // this.argument('appname', { type: String, required: true });
    // this.argument('othername', { type: String, required: true });

    // And you can then access it later; e.g.
    // this.log(this.options.appname);
    this.config.save()
    // this.log(this.options)
  }

  initializing() {
    // this.pkg = require('../package.json');
  }

  prompting() {
    return this.prompt([{
      type: 'confirm',
      name: 'npminstall',
      message: 'Do you wanna install automaticly',
      default: false, // Default to current folder name
      store: true,
    }])
  }

  writing() {
    fs
      .copy(this.sourceRoot(), this.destinationRoot())
      .then(() => this.log('Base file structure is built by the scaffold!'))
  }

  install() {
    const self = this
    if (this.options.npminstall) {
      this.installDependencies({
        bower: false,
        yarn: false,
        npm: true,
        callback() {
          self.log('Everything is ready.');
        },
      })
    }
  }

  end() {
    if (this.options.npminstall) {
      this.log('You can build your app!');
    } else {
      this.log('Please use npm install to init your project!')
    }
  }

};
