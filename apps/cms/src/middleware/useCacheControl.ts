import { NextFunction, Response } from 'express'
import { PayloadRequest } from 'payload/types'

export const useCacheControl =
  (value: string) => (_: PayloadRequest, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', value)

    next()
  }
