/* eslint-disable prefer-destructuring */
const YAML = require('js-yaml');
const fs = require('fs');
const db = require('../../models/index');

const validation = fs.readFileSync('yaml/validation.yaml');
const data = YAML.load(validation);
const userList = db.User;
const { Api422Error } = require('../../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../../utilities/Errors/BaseError');

exports.show = async (req, res) => {
  try {
    const user = await userList.findByPk(req.params.id, {
      where: { is_admin: false },
      attributes: ['first_name', 'last_name', 'email', 'phone', 'gender', 'date_of_birth', 'is_admin'],
    });
    res.status(200).send({
      user: user,
    });
  } catch (error) {
    res.status(404).send({
      message: 'User not found.',
    });
  }
};

exports.create = async (req, res) => {
  const userDetails = await userList.create(req.body).then((newUser) => {
    const user = userList.findOne({
      where: {
        id: newUser.id,
      },
      attributes: ['id', 'first_name', 'last_name', 'email', 'password', 'phone', 'gender', 'date_of_birth', 'is_admin'],
    });
    return user;
  });
  res.status(201).send({
    user: userDetails,
    message: 'user details created',
  });
};

exports.filter = async (req, res) => {
  const users = await userList.findAll({
    where: { is_admin: false },
    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'gender', 'date_of_birth', 'is_admin'],
  });
  try {
    res.status(200).send({

      users: users,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await userList.findByPk(req.params.id);
    if (user) {
      user.update(req.body);
      res.status(202).send({
        user: user,
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const _ = userList.destroy({ where: { id: req.params.id } });
    res.send({
      message: 'User deleted!',
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
