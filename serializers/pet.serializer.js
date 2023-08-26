
const show = async (pet) => {
  const responseData = {
    id: pet.id,
    user_id: pet.user_id,
    age: pet.age,
    image: pet.image,
    name: pet.name,
    colour: pet.colour,
    life_expectancy: pet.life_expectancy,
    breed: pet.breed,
    user: {
      fullname: pet.user.first_name.concat(`${pet.user.last_name}`),
    },
  };
  return responseData;
};

const index = async (pets) => {
  const petList = [];
  pets.forEach((pet) => {
    const user = {
      id: pet.id,
      user_id: pet.user_id,
      age: pet.age,
      image: pet.image,
      name: pet.name,
      colour: pet.colour,
      life_expectancy: pet.life_expectancy,
      breed: pet.breed,
      user: {
        fullname: pet.user.first_name.concat(`${pet.user.last_name}`),
      },
    };
    petList.push(user);
  });
  return petList;
};

module.exports = {
  show, index,
};
