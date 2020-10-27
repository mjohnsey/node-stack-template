import {Request, Response, NextFunction} from 'express'
import {v4 as uuidv4} from 'uuid'

export const REQUEST_ID_HEADER_NAME = 'X-Request-Id'

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const incomingRequestId = req.headers[REQUEST_ID_HEADER_NAME.toLowerCase()]
  const id = (incomingRequestId || uuidv4()) as string
  res.setHeader(REQUEST_ID_HEADER_NAME, id)
  next()
}
