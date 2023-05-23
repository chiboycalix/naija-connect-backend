import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors'

export const badRequestError = (req: Request, res: Response, next: NextFunction, message: string, statusCode: number) => {
  next(
    new BadRequestError(
      message,
      true,
      statusCode || StatusCodes.BAD_REQUEST
    )
  );
}
