const { Op } = require('sequelize');
const db = require('../models/index');

const { chatRoom } = db;
const serialize = require('../serializers/chat_room.serializer');

exports.show = async (req, res) => {
  try {
    const chat = await chatRoom.findByPk(req.params.id);
    const responseData = await serialize.show(chat);
    res.status(200).send({
      chat: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'chat connection not found.',
    });
  }
};

exports.create = async (req, res) => {
  try {
    const chat = await chatRoom.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [
              {
                sender_id: req.body.sender_id,
              },
              {
                receiver_id: req.body.receiver_id,
              }],
          },
          {
            [Op.and]: [
              {
                sender_id: req.body.receiver_id,
              },
              {
                receiver_id: req.body.sender_id,
              },
            ],
          },
        ],
      },
    });
    if (chat) {
      const responseData = await serialize.show(chat);
      res.status(200).send({
        chat: responseData,
      });
    } else {
      const chatroom = await chatRoom.create(req.body);
      const responseData = await serialize.show(chatroom);
      res.status(201).send({
        chat: responseData,
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

