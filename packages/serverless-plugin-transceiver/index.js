'use strict'

const BbPromise = require('bluebird')
const path = require('path')

class TransceiverPlugin {
  constructor(serverless, options) {
    this.serverless = serverless
    this.options = options

    Object.assign(
      this,
      run
    )

    this.commands = {
      transceiver: {
        usage: 'Simulate λ locally',
        commands: {
          docs: {
            usage: 'Generate service documentation',
            lifecycleEvents: [
              'generate',
            ],
            options: {
              folder: {
                usage: 'Specify a output folder',
                shortcut: 'f',
              },
            },
          },
          sdk: {
            usage: 'Generate service sdk',
            lifecycleEvents: [
              'generate',
            ],
            options: {
              folder: {
                usage: 'Specify a output folder',
                shortcut: 'f',
              },
            },
          },
        },
      },
    }

    this.hooks = {
      'transceiver:docs:generate': () => BbPromise.bind(this)
        .then(this.generateDocs)
        .then(out => this.serverless.cli.consoleLog(out)),

      'transceiver:sdk:generate': () => BbPromise.bind(this)
        .then(this.generateSDK)
        .then(out => this.serverless.cli.consoleLog(out)),
    }
  }

  generateDocs() {
  }

  generateSDK() {
  }
}

module.exports = TransceiverPlugin
