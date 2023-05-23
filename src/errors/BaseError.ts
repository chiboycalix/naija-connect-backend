export class BaseError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(message: string, isOperational: boolean, statusCode: number){
    super(message);
    Object.setPrototypeOf(this, new.target.prototype)
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}