import { StatusCodes } from 'http-status-codes';
import { BaseError } from './BaseError';

export class BadRequestError extends BaseError {
  constructor(message = "Bad Request",
    isOperational = true,
    statusCode = StatusCodes.BAD_REQUEST) {
    super(message, isOperational, statusCode);
    this.isOperational = isOperational
    this.statusCode = statusCode
  }
}