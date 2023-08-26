const show = async (subCategory) => {
  const responseData = {
    id: subCategory.id,
    name: subCategory.name,
    product_category_id: subCategory.product_category_id,
  };
  const products = [];
  subCategory.products.forEach((product) => {
    const productDetail = {
      id: product.id,
      product_sub_category_id: product.product_sub_category_id,
      size: product.size,
      price: product.price,
      name: product.name,
      quantity: product.quantity,
      weight: product.weight,
      image: product.image,
      total_price: product.total_price,
      description: product.description,
      brand: product.brand,
    };
    products.push(productDetail);
  });
  responseData.products = products;
  return responseData;
};

module.exports = {
  show,
};

