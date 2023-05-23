import { StatusCodes } from 'http-status-codes';
import { Response } from "express";
import chalk from 'chalk';

const BasicResponse = {
  success: false,
  statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  message: "Internal server error",
  data: {}
}

/**
 * Handles API responses
 */
export class ResponseManager {
  static get HTTP_STATUS() {
    return StatusCodes;
  }

  static getResponseHandler(res: Response) {
    return {
      onSuccess(message: string, code: number, data: any) {
        return ResponseManager
          .respondWithSuccess(res, message, code, data)
      },
      onError(message: string, code: number, data: any) {
        return ResponseManager
          .respondWithError(
            res,
            message,
            code,
            data
          )
      }
    }
  }

  static respondWithSuccess(res: Response, message = "success", code = ResponseManager.HTTP_STATUS.OK, data = {}) {
    const response = { ...BasicResponse }
    response.success = true
    response.message = message
    response.data = data
    response.statusCode = code

    return res.status(code).json(response)
  }

  static respondWithError(
    res: Response, message = "Unknown error", code = ResponseManager.HTTP_STATUS.INTERNAL_SERVER_ERROR, data = {}
  ) {
    const response = { ...BasicResponse }
    response.success = false
    response.message = message
    response.statusCode = code
    response.data = data;

    // log all errors
    console.log(chalk.hex('#3c3').bold(response));
    return res.status(code).json(response)
  }
}

