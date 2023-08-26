const db = require('../models/index');
const serialize = require('../serializers/user.serializer');

const { Address, User } = db;

exports.create = async (req, res) => {
  const userDetails = await User.create(req.body).then((newUser) => {
    const user = User.findOne({
      where: {
        id: newUser.id,
      },
      include: [{
        model: Address,
        as: 'addresses',
      }],
    });
    return user;
  });
  const responseData = await serialize.show(userDetails);
  res.status(201).send({
    user: responseData,
    message: 'user details created',
  });
};

exports.show = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: Address,
        as: 'addresses',
      }],
    });
    const responseData = await serialize.show(user);
    res.status(200).send({
      user: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'user data not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: Address,
        as: 'addresses',
      }],
    });
    user.update(req.body).then(() => {
      serialize.show(user).then((responseData) => {
        res.status(202).send({
          user: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'User deleted',
      });
    } else {
      res.status(404).send({
        message: 'User not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter = async (req, res) => {
  const users = await User.findAll({
    where: { is_admin: false },
    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'gender', 'date_of_birth'],
  });
  try {
    res.status(200).send({

      users: users,
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};
