import { StatusCodes } from 'http-status-codes';
import { BaseError } from './BaseError';

export class UnauthorizedError extends BaseError {
  constructor(message = "You are not authorized to perform this action.",
    isOperational = true,
    statusCode = StatusCodes.UNAUTHORIZED) {
    super(message, isOperational, statusCode);
    this.isOperational = isOperational
    this.statusCode = statusCode
  }
}