const db = require('../models/index');
const serialize = require('../serializers/cart_item.serializer');

const { CartItem, Product } = db;

exports.create = async (req, res) => {
  const cartItemDetails = await CartItem.create(req.body).then((newCartItem) => {
    const cartItem = CartItem.findOne({
      where: {
        id: newCartItem.id,
      },
      include: [
        {
          model: Product,
          as: 'products',
        },
      ],
    });
    return cartItem;
  });
  const responseData = await serialize.show(cartItemDetails);
  res.status(201).send({
    cart_item: responseData,
    message: 'Cart Item created',
  });
};

exports.show = async (req, res) => {
  try {
    const cartItem = await CartItem.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          as: 'products',
        }],
    });
    const responseData = await serialize.show(cartItem);
    res.status(200).send({
      cart_item: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'cart item data not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const cartItem = await CartItem.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          as: 'products',
        }],
    });
    cartItem.update(req.body).then(() => {
      serialize.show(cartItem).then((responseData) => {
        res.status(202).send({
          cart_item: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    if (cartItem) {
      cartItem.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'Cart Item deleted',
      });
    } else {
      res.status(404).send({
        message: 'Cart Item not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter = async (req, res) => {
  try {
    const cartItem = await CartItem.findAll({
      attributes: ['id', 'cart_id', 'product_id', 'quantity', 'price'],
      order: [['created_at', 'DESC']],
    });
    res.status(200).send({
      cartItem: cartItem,
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};
