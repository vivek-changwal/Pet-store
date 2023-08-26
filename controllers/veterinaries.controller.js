const db = require('../models/index');
const serialize = require('../serializers/veterinary.serializer');

const { Veterinary, User } = db;

exports.create = async (req, res) => {
  const veterinaryDetails = await Veterinary.create(req.body).then((newVeterinary) => {
    const veterinary = Veterinary.findOne({
      where: {
        id: newVeterinary.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    return veterinary;
  });
  const responseData = await serialize.show(veterinaryDetails);
  res.status(201).send({
    veterinary: responseData,
    message: 'Veterinary details created',
  });
};

exports.show = async (req, res) => {
  try {
    const veterinary = await Veterinary.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    const responseData = await serialize.show(veterinary);
    res.status(200).send({
      veterinary: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'veterinary data not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const veterinary = await Veterinary.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email', 'phone'],
        },
      ],
    });
    await veterinary.update(req.body);
    if (req.body.user) {
      const user = await User.findByPk(veterinary.user_id);
      await user.update(req.body.user);
    }
    res.status(202).send({
      veterinary: veterinary,
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const veterinary = await Veterinary.findByPk(req.params.id);
    if (veterinary) {
      veterinary.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'veterinary ddata deleted',
      });
    } else {
      res.status(404).send({
        message: 'veterinary data not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter = async (req, res) => {
  try {
    const veterinary = await Veterinary.findAll({
      attributes: ['id', 'user_id', 'experience', 'start_time', 'end_time', 'fees', 'address'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email', 'phone'],
        }],
    });
    res.status(200).send({
      veterinary: veterinary,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};
