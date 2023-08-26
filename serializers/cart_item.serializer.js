const show = async (cartItem) => {
  const cartItemDetails = {
    id: cartItem.id,
    cart_id: cartItem.cart_id,
    product_id: cartItem.product_id,
    quantity: cartItem.quantity,
    price: cartItem.price,
    products: {
      size: cartItem.products.size,
      name: cartItem.products.name,
      quantity: cartItem.products.quantity,
      weight: cartItem.products.weight,
      image: cartItem.products.image,
      total_price: cartItem.products.total_price,
      description: cartItem.products.description,
      brand: cartItem.products.brand,
    },
  };
  return cartItemDetails;
};

module.exports = {
  show,
};

