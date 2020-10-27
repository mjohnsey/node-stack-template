import {Controller, Get, ClassMiddleware, Middleware} from '@overnightjs/core'
import {Logger} from '@overnightjs/logger'
import {Request, Response} from 'express'
import {OK} from 'http-status-codes'

import {requestIdMiddleware, REQUEST_ID_HEADER_NAME} from '../middlewares/request-id'

@Controller('/')
@ClassMiddleware([requestIdMiddleware])
export default class BaseController {
  public serverVersion: string

  public endpoints: any

  private suppressDebuggingData: boolean

  constructor(serverVersion: string, endpoints: any, suppressDebuggingData = false) {
    this.serverVersion = serverVersion
    this.endpoints = endpoints
    this.suppressDebuggingData = suppressDebuggingData
    Logger.Info('BaseController added')
  }

  @Get('')
  private get(req: Request, res: Response) {
    const requestId = res.getHeader(REQUEST_ID_HEADER_NAME)
    Logger.Info(`[${requestId}] GET /`)
    const result: any = {}
    result.server = {serverVersion: this.serverVersion}
    if (this.suppressDebuggingData === false) {
      result.server.platform = process.platform
      result.server.architecture = process.arch
      result.server.nodeVersion = process.version
      result.server.endpoints = this.endpoints
    }
    result.requestId = requestId

    return res.status(OK).json(result)
  }
}
