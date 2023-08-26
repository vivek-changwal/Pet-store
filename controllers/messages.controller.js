const db = require('../models/index');

const { Message, User } = db;
const serialize = require('../serializers/message.serializer');

exports.index = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: {
        chat_id: req.params.id,
      },
      include: [{
        model: User,
        as: 'sender',
      },
      {
        model: User,
        as: 'receiver',
      }],
    });
    const responseData = await serialize.index(messages);
    res.status(200).send({
      chats: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    const responseData = await serialize.show(message);
    res.status(201).send({
      message: responseData,
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const _ = Message.destroy({ where: { id: req.params.id } });
    res.status(200).send({
      message: 'message deleted!',
    });
  } catch (error) {
    res.status(404).send({
      message: 'message not found.',
    });
  }
};

