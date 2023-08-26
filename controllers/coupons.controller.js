const db = require('../models/index');
const serialize = require('../serializers/coupon.serializer');

const { Coupon } = db;

exports.create = async (req, res) => {
  const coupon = await Coupon.create(req.body);
  const responseData = await serialize.show(coupon);
  res.status(201).send({
    coupon: responseData,
    message: 'coupon created',
  });
};

exports.show = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    const responseData = await serialize.show(coupon);
    res.status(200).send({
      coupon: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'coupon data not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    coupon.update(req.body).then(() => {
      serialize.show(coupon).then((responseData) => {
        res.status(202).send({
          coupon: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (coupon) {
      coupon.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'coupon deleted',
      });
    } else {
      res.status(404).send({
        message: 'coupon not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};
