const db = require('../models/index');
const serialize = require('../serializers/order.serializer');

const {
  Order, User, Address, CartItem,
} = db;
const { Api422Error } = require('../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

exports.create = async (req, res) => {
  const orderDetails = await Order.create(req.body).then((newOrder) => {
    const order = Order.findOne({
      where: {
        id: newOrder.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    return order;
  });
  const responseData = await serialize.show(orderDetails);
  res.status(201).send({
    order: responseData,
    message: 'order created',
  });
};

exports.show = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    const responseData = await serialize.show(order);
    res.status(200).send({
      order: responseData,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};


exports.update = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    order.update(req.body).then(() => {
      serialize.show(order).then((responseData) => {
        res.status(202).send({
          order: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (order) {
      order.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'order deleted',
      });
    } else {
      res.status(404).send({
        message: 'order not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter = async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
          include: [
            { model: Address, as: 'addresses', attributes: ['discrict', 'city', 'state', 'area', 'shipping'] },
          ],
        },
        {
          model: CartItem,
          as: 'cart_items',
        },
      ],
      order: [['created_at', 'DESC']],
    });
    res.status(200).send({
      order: order,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
