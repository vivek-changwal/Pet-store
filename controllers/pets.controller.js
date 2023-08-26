const db = require('../models/index');
const serialize = require('../serializers/pet.serializer');

const { Pet, User } = db;

exports.create = async (req, res) => {
  const petDetails = await Pet.create(req.body).then((newPet) => {
    const pet = Pet.findOne({
      where: {
        id: newPet.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });
    return pet;
  });
  const responseData = await serialize.show(petDetails);
  res.status(201).send({
    pet: responseData,
    message: 'pet details created',
  });
};

exports.show = async (req, res) => {
  try {
    const pet = await Pet.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
        }],
    });
    const responseData = await serialize.show(pet);
    res.status(200).send({
      pet: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'pet data not found.',
    });
  }
};


exports.update = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        },
      ],
    });
    await pet.update(req.body);
    if (req.body.user) {
      const user = await User.findByPk(pet.user_id);
      await user.update(req.body.user);
    }
    res.status(202).send({
      pet: pet,
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (pet) {
      pet.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'pet details deleted',
      });
    } else {
      res.status(404).send({
        message: 'pet details not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};


exports.filter = async (req, res) => {
  try {
    const pets = await Pet.findAll({
      attributes: ['id', 'age', 'image', 'user_id', 'name', 'colour', 'life_expectancy', 'breed'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name'],
        }],
      order: [['created_at', 'DESC']],
    });
    res.status(200).send({
      pets: pets,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
    });
  }
};
