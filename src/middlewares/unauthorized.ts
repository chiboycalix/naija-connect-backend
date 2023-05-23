import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors'

export const unAuthorizedError = (role = '') => {
  return (req: any, res: Response, next: NextFunction) => {
    const { role: _role } = req.user
    if (role == _role) {
      next()
    } else {
      throw new UnauthorizedError()
    }
  }
}
