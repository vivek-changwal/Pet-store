const { Op } = require('sequelize');
const db = require('../models/index');
const serialize = require('../serializers/events.serializer');
const { getPagination, getPagingData } = require('../utilities/pagination');

const { Event, User } = db;

exports.create = async (req, res) => {
  const eventDetails = await Event.create(req.body).then((newEvent) => {
    const event = Event.findOne({
      where: {
        id: newEvent.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    return event;
  });
  const responseData = await serialize.show(eventDetails);
  res.status(201).send({
    event: responseData,
    message: 'event created',
  });
};

exports.show = async (req, res) => {
  try {
    const event = await Event.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    const responseData = await serialize.show(event);
    res.status(200).send({
      event: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'event data not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
      ],
    });
    await event.update(req.body);
    if (req.body.user) {
      const user = await User.findByPk(event.user_id);
      await user.update(req.body.user);
    }
    res.status(202).send({
      event: event,
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      event.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'event deleted',
      });
    } else {
      res.status(404).send({
        message: 'event not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter_index = async (req, res) => {
  const {
    page, size, location, name, organisedby,
  } = req.query;
  const organisedbyFilter = organisedby ? { [Op.iLike]: `%${organisedby}%` } : null;
  const nameFilter = name ? { [Op.iLike]: `%${name}%` } : null;
  const locationFilter = location ? { [Op.iLike]: `%${location}%` } : null;
  const { limit, offset } = getPagination(page, size);
  try {
    const events = await Event.findAndCountAll({
      where: {
        ...organisedbyFilter && { organised_by: organisedbyFilter },
        ...nameFilter && { name: nameFilter },
        ...locationFilter && { location: locationFilter },
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
      limit,
      offset,
    });

    const pagingData = getPagingData(events, page, limit);
    const responseData = await serialize.index(events);
    res.status(200).send({
      events: responseData,
      pagingData,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

