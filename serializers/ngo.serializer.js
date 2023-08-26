const show = async (ngo) => {
  const ngoDetails = {
    id: ngo.id,
    address: ngo.address,
    contact: ngo.contact,
    time: ngo.time,
    name: ngo.name,
    user: {
      first_name: ngo.user.first_name,
      last_name: ngo.user.last_name,
      email: ngo.user.email,
    },
  };
  return ngoDetails;
};

const index = async (ngos) => {
  const ngosList = [];
  Array.from(ngos.rows).forEach((ngo) => {
    const user = {
      id: ngo.id,
      address: ngo.address,
      contact: ngo.contact,
      time: ngo.time,
      name: ngo.name,
      user: {
        first_name: ngo.user.first_name,
        last_name: ngo.user.last_name,
        email: ngo.user.email,
      },
    };
    ngosList.push(user);
  });
  return ngosList;
};

module.exports = {
  show, index,
};

