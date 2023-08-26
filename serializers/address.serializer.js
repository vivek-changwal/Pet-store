const show = async (address) => {
  const addressDetails = {
    id: address.id,
    user_id: address.user_id,
    order_id: address.order_id,
    discrict: address.discrict,
    city: address.city,
    states: address.states,
    area: address.area,
    shipping: address.shipping,
  };
  return addressDetails;
};

module.exports = {
  show,
};

