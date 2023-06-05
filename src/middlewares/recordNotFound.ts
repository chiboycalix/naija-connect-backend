import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ResourceNotFoundError } from '../errors'

export const recordNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(
    new ResourceNotFoundError(
      `Record with id ${req.params.id} not found`,
      true,
      StatusCodes.NOT_FOUND
    )
  );
}
