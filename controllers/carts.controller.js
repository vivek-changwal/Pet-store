const db = require('../models/index');
const serialize = require('../serializers/cart.serializer');
const { Api422Error } = require('../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

const { Cart, User, CartItem } = db;

exports.create = async (req, res) => {
  const cart = await Cart.create(req.body);
  const responseData = await serialize.show(cart);
  res.status(201).send({
    cart: responseData,
    message: 'cart created',
  });
};

exports.show = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'user_id', 'total_quantity', 'total_amount', 'status'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
        {
          model: CartItem,
          as: 'cart_items',
          attributes: ['cart_id', 'product_id'],
        },
      ],
    });
    res.status(200).send({
      cart: cart,
    });
  } catch (error) {
    res.status(404).send({
      message: 'Cart data not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
      ],
    });
    await cart.update(req.body);
    if (req.body.user) {
      const user = await User.findByPk(cart.user_id);
      await user.update(req.body.user);
    }

    serialize.show(cart).then((responseData) => {
      res.status(202).send({
        cart: cart,
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (cart) {
      cart.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'cart deleted',
      });
    } else {
      res.status(404).send({
        message: 'cart not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      attributes: ['id', 'user_id', 'total_quantity', 'total_amount', 'status'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        }, {
          model: CartItem,
          as: 'cart_items',
          attributes: ['cart_id', 'product_id'],
        }],
      order: [['created_at', 'DESC']],
    });
    res.status(200).send({
      cartdata: cart,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
