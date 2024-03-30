const badRequestError = 400;
const logInError = 401;
const forbiddenError = 403;
const notFoundError = 404;
const defaultError = 500;
const conflictError = 409;

class Error {
  message: string;
  statusCode: number;
  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default {
  badRequestError,
  notFoundError,
  logInError,
  defaultError,
  Error,
  forbiddenError,
  conflictError,
};
