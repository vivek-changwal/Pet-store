const { BaseError, httpStatusCodes } = require('./BaseError');

class Api400BadRequestError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    description = 'Invalid Request',
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, description);
  }
}
class Api404Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, description);
  }
}
class Api422Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.UNPROCESSABLE,
    description = 'unable to process the contained instructions.',
    isOperational = true,
  ) {
    super(name, statusCode, isOperational, description);
  }
}
module.exports = {
  Api400BadRequestError, Api422Error, Api404Error,
};

