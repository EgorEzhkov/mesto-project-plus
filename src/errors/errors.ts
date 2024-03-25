const badRequestError = 400;
const notFoundError = 404;
const defaultError = 500;

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
  defaultError,
  Error,
};
