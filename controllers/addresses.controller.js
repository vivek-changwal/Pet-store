const db = require('../models/index');
const serialize = require('../serializers/address.serializer');

const { Address } = db;

exports.create = async (req, res) => {
  const address = await Address.create(req.body);
  const responseData = await serialize.show(address);
  res.status(201).send({
    address: responseData,
    message: 'address created',
  });
};

exports.show = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    const responseData = await serialize.show(address);
    res.status(200).send({
      address: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'address not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    address.update(req.body).then(() => {
      serialize.show(address).then((responseData) => {
        res.status(202).send({
          address: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (address) {
      address.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'address deleted',
      });
    } else {
      res.status(404).send({
        message: 'address not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

