require('dotenv').config();
const { requestforgetPassword, requestlogin, requestPassword } = require('../utilities/auth');
const { Api422Error } = require('../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

exports.forgetPassword = async (req, res, next) => {
  try {
    const requestPasswordService = await requestforgetPassword(req, res, next);
    res.json(requestPasswordService);
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
exports.login = async (req, res, next) => {
  try {
    const requestloginService = await requestlogin(req, res, next);
    res.json(requestloginService);
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const requestResetService = await requestPassword(req, res, next);
    res.json(requestResetService);
    next();
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
