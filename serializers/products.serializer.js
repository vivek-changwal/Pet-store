const show = async (product) => {
  const responseData = {
    id: product.id,
    product_category_id: product.product_category_id,
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
  const feedbackArrayData = [];
  product.feedbacks.forEach((feedback) => {
    const feedBack = {
      id: feedback.id,
      product_id: feedback.product_id,
      feedback: feedback.feedback,
      user_id: feedback.user_id,
    };
    feedbackArrayData.push(feedBack);
  });
  responseData.feedbacks = feedbackArrayData;
  return responseData;
};

module.exports = {
  show,
};
