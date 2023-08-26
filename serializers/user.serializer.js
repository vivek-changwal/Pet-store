const show = async (user) => {
  const responseData = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    date_of_birth: user.date_of_birth,
    password: user.password,
  };
  const userArrayData = [];
  user.addresses.forEach((adr) => {
    const address = {
      id: adr.id,
      order_id: adr.order_id,
      discrict: adr.discrict,
      city: adr.city,
      state: adr.state,
      area: adr.area,
      shipping: adr.shipping,
    };
    userArrayData.push(address);
  });
  responseData.addresses = userArrayData;
  return responseData;
};

module.exports = {
  show,
};

