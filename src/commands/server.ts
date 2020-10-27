import {Command, flags} from '@oclif/command'

import {Config} from '../utils'
import {NodeStackTemplateServer} from '../server/server'

export default class Server extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ node-stack-template server
`,
  ]

  static flags = {
    debug: flags.boolean({char: 'd', description: 'run with debugging'}),
  }

  static args = []

  async run() {
    const config = Config.loadConfig(this.config.configDir)
    const {flags} = this.parse(Server)

    const debug = flags.debug || config.ConfigToml.debug
    const serverPort = config.ConfigToml?.server?.port || 8080

    const server = new NodeStackTemplateServer(debug,
      this.config.version)
    server.start(serverPort)
  }
}
