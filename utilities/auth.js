/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
require('dotenv').config();
const { Api404Error } = require('./Errors/error.handler');
const { httpStatusCodes } = require('./Errors/BaseError');

const { User } = db;
const { TRANSPORTER } = require('./nodemailer');

const requestforgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: { email },
  });
  try {
    const resetToken = jwt.sign({ id: req.body.id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: process.env.EXPIRY_IN,
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'To Change Password',
      html: `
          <h1>Clink on link to reset password</h1>
          <p> <a href ="http://localhost:3000/reset-password/${resetToken}"</a> Click here</p>`,
    };
    await user.update({ reset_token: resetToken });
    TRANSPORTER.sendMail(mailOptions, (err, result) => {
    });
    res.status(200).send({
      message: 'Email Sent!',
    });
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({
      message: new Api404Error(error.message),
    });
    next();
  }
};

const requestlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, attributes: ['email', 'password', 'first_name'] });
    if (!user) {
      res.status(httpStatusCodes.NOT_FOUND).send({
        message: 'User not found',
      });
    } else {
      const decoded = await bcrypt.compare(password, user.password);
      if (user.email === email && decoded) {
        const jwtToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
          expiresIn: '24hr',
        });
        res.send({
          token: jwtToken,
          user: user,
        });
      } else {
        res.status(401).send({
          message: 'Invalid email or password!',
        });
      }
    }
  } catch (error) {
    res.send(({
      message: error.message,
    }));
    next();
  }
};
const requestResetPassword = async (req, res, next) => {
  try {
    const { reset_token, new_password, email } = req.body;
    const verify = jwt.verify(reset_token, process.env.RESET_PASSWORD_KEY);
    if (verify) {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        user.update({ password: new_password, reset_token: '' });
        res.status(200).send({
          message: 'password updated',
        });
      } else {
        res.send('invalid token or user does not exist');
      }
    } else {
      res.send('invalid token');
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  requestforgetPassword,
  requestlogin,
  requestResetPassword,
};
