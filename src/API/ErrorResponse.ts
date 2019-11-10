import { ErrorCode, IErrorResponse } from "./API";

export class ErrorResponse extends Error implements IErrorResponse {
  public code: ErrorCode = ErrorCode.InvalidUser;
  public message: string = "";
  constructor(err: IErrorResponse) {
    super(err.message);
    this.code = err.code;
    this.message = err.message;
  }
}
