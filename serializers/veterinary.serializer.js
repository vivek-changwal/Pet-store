const show = async (veterinary) => {
  const veterinaryDetails = {
    id: veterinary.id,
    user_id: veterinary.user_id,
    experience: veterinary.experience,
    start_time: veterinary.start_time,
    end_time: veterinary.end_time,
    fees: veterinary.fees,
    address: veterinary.address,
    user: {
      fullname: veterinary.user.first_name.concat(`${veterinary.user.last_name}`),
      email: veterinary.user.email,
      phone: veterinary.user.phone,
    },
  };
  return veterinaryDetails;
};

module.exports = {
  show,
};

