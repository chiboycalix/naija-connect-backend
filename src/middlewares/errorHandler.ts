import chalk from 'chalk';
import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { ResponseManager } from '../utils/response';

export const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
if (err.statusCode && err.statusCode >= 500) {
  console.log(chalk.hex('#3c3').bold("---------------START OF ERROR(S)---------------------"));
  console.log(chalk.hex('#3c3').bold(`An error occurred for request`, err));
  console.log(chalk.hex('#3c3').bold("---------------END OF ERROR(S)---------------------"));
}

const errorMessage = err.message ? err.message : 'Something went wrong!'
const errorData = err.data ? err.data : err;
return ResponseManager.getResponseHandler(res).onError(
  errorMessage,
  err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  errorData
 )
}
