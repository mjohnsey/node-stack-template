import {Server as OvernightServer} from '@overnightjs/core'
import {Logger} from '@overnightjs/logger'
import * as express from 'express'

import BaseController from '../server/controllers/base'

export class NodeStackTemplateServer extends OvernightServer {
  public version: string

  constructor(debug: boolean, version: string) {
    super(debug)
    this.version = version
    this.app.use(express.json({type: '*/*'}))
    this.setupControllers()
  }

  public start(port = 8080): void {
    this.app.listen(port, () => {
      Logger.Imp(`Server running: http://localhost:${port}`)
    })
  }

  private setupControllers(): void {
    // eslint-disable-next-line no-warning-comments
    // TODO: add some controllers here
    // const controllers = []
    // controllers.push(new OtherController(firehoseStore))
    // super.addControllers(controllers)

    const listEndpoints = require('express-list-endpoints')
    const endpoints = listEndpoints(super.app)
    // Add last
    super.addControllers(new BaseController(this.version, endpoints))
  }
}
