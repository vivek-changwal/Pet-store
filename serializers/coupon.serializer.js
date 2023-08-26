const show = async (cart) => {
  const coupons = {
    id: cart.id,
    name: cart.name,
    discount_percent: cart.discount_percent,
    valid_from: cart.valid_from,
    expired_at: cart.expired_at,
    product_category_id: cart.product_category_id,
  };
  return coupons;
};

module.exports = {
  show,
};

