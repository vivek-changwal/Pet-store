const db = require('../models/index');
const serialize = require('../serializers/feedback.serializer');

const { Feedback, User } = db;

exports.create = async (req, res) => {
  const feedbackDetails = await Feedback.create(req.body).then((newFeedback) => {
    const feedback = Feedback.findOne({
      where: {
        id: newFeedback.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    return feedback;
  });
  const responseData = await serialize.show(feedbackDetails);
  res.status(201).send({
    feedback: responseData,
    message: 'feedback data created',
  });
};

exports.show = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    const responseData = await serialize.show(feedback);
    res.status(200).send({
      feedback: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'feedback data not found.',
    });
  }
};

exports.filter = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      where: {
        user_id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    const responseData = await serialize.index(feedbacks);
    res.status(200).send({
      feedbacks: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    feedback.update(req.body).then(() => {
      serialize.show(feedback).then((responseData) => {
        res.status(202).send({
          feedback: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      feedback.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'feedback ddata deleted',
      });
    } else {
      res.status(404).send({
        message: 'feedback data not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};
