import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ResourceNotFoundError } from '../errors'

export const resourceNotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(
    new ResourceNotFoundError(
      `You have tried to access an API endpoint (${req.url}) with a '${req.method}' method that does not exist.`,
      true,
      StatusCodes.NOT_FOUND
    )
  );
}
