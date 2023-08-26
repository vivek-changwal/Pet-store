const { Op } = require('sequelize');
const db = require('../models/index');
const serialize = require('../serializers/ngo.serializer');

const { NGO, User } = db;
const { getPagination, getPagingData } = require('../utilities/pagination');


exports.create = async (req, res) => {
  const ngoDetails = await NGO.create(req.body).then((newNgo) => {
    const ngo = NGO.findOne({
      where: {
        id: newNgo.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    return ngo;
  });
  const responseData = await serialize.show(ngoDetails);
  res.status(201).send({
    ngo: responseData,
    message: 'ngo created',
  });
};

exports.show = async (req, res) => {
  try {
    const ngo = await NGO.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    const responseData = await serialize.show(ngo);
    res.status(200).send({
      ngo: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'ngo data not found.',
    });
  }
};


exports.update = async (req, res) => {
  try {
    const ngo = await NGO.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email'],
        },
      ],
    });
    await ngo.update(req.body);
    if (req.body.user) {
      const user = await User.findByPk(ngo.user_id);
      await user.update(req.body.user);
    }
    res.status(202).send({
      ngo: ngo,
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const ngo = await NGO.findByPk(req.params.id);
    if (ngo) {
      ngo.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'ngo deleted',
      });
    } else {
      res.status(404).send({
        message: 'ngo not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter_index = async (req, res) => {
  const {
    page, size, name, contact, address,
  } = req.query;
  const addressFilter = address ? { [Op.iLike]: `%${address}%` } : null;
  const contactFilter = contact ? { [Op.iLike]: `%${contact}%` } : null;
  const nameFilter = name ? { [Op.iLike]: `%${name}%` } : null;
  const { limit, offset } = getPagination(page, size);
  try {
    const ngos = await NGO.findAndCountAll({
      where: {
        ...addressFilter && { address: addressFilter },
        ...contactFilter && { contact: contactFilter },
        ...nameFilter && { name: nameFilter },
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
    const pagingData = getPagingData(ngos, page, limit);
    const responseData = await serialize.index(ngos);
    res.status(200).send({
      ngos: responseData,
      pagingData,
    });
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred while processing your request.',
    });
  }
};
