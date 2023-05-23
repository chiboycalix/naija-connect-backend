import { StatusCodes } from 'http-status-codes';
import { BaseError } from './BaseError';

export class ForbiddenError extends BaseError {
  constructor(message = "Request is forbidden.",
    isOperational = true,
    statusCode = StatusCodes.FORBIDDEN) {
    super(message, isOperational, statusCode);
    this.isOperational = isOperational
    this.statusCode = statusCode
  }
}