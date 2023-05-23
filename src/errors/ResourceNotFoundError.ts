import { StatusCodes } from 'http-status-codes';
import { BaseError } from './BaseError';

export class ResourceNotFoundError extends BaseError {
  constructor(message = "Request is forbidden.",
    isOperational = true,
    statusCode = StatusCodes.NOT_FOUND) {
    super(message, isOperational, statusCode);
    this.isOperational = isOperational
    this.statusCode = statusCode
  }
}