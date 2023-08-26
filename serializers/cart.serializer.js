const show = async (cart) => {
  const cartDetails = {
    id: cart.id,
    user_id: cart.user_id,
    total_quantity: cart.total_quantity,
    total_amount: cart.total_amount,
    status: cart.status,
  };
  return cartDetails;
};

module.exports = {
  show,
};

