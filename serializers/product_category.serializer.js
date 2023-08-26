const show = async (productCategory) => {
  const productData = {
    id: productCategory.id,
    name: productCategory.name,
  };
  const productSubCategories = [];
  productCategory.product_sub_categories.forEach((subCategory) => {
    const productSubCategory = {
      id: subCategory.id,
      name: subCategory.name,
    };
    productSubCategories.push(productSubCategory);
  });
  const couponArrayData = [];
  productCategory.coupons.forEach((copon) => {
    const coupons = {
      id: copon.id,
      name: copon.name,
      discount_percent: copon.discount_percent,
      valid_from: copon.valid_from,
      expired_at: copon.expired_at,
    };
    couponArrayData.push(coupons);
  });
  productData.product_sub_categories = productSubCategories;
  productData.coupons = couponArrayData;
  return productData;
};

module.exports = {
  show,
};

