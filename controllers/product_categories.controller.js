const db = require('../models/index');
const serialize = require('../serializers/product_category.serializer');
const { Api422Error } = require('../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

const { ProductCategory, ProductSubCategory, Coupon } = db;

exports.create = async (req, res) => {
  const productCategoryDetails = await ProductCategory.create(req.body).then((newProductCategory) => {
    const productCategory = ProductCategory.findOne({
      where: {
        id: newProductCategory.id,
      },
      include: [{
        model: ProductSubCategory,
        as: 'product_sub_categories',
      },
      {
        model: Coupon,
        as: 'coupons',
      }],
    });
    return productCategory;
  });
  const responseData = await serialize.show(productCategoryDetails);
  res.status(201).send({
    product_category: responseData,
    message: 'product category details created',
  });
};

exports.show = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: ProductSubCategory,
        as: 'product_sub_categories',
      },
      {
        model: Coupon,
        as: 'coupons',
      }],
    });
    const responseData = await serialize.show(productCategory);
    res.status(200).send({
      product_category: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'sub category not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findOne({
      where: {
        id: req.params.id,
      },
      include: [{
        model: ProductSubCategory,
        as: 'product_sub_categories',
      },
      {
        model: Coupon,
        as: 'coupons',
      }],
    });
    productCategory.update(req.body).then(() => {
      serialize.show(productCategory).then((responseData) => {
        res.status(202).send({
          product_category: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByPk(req.params.id);
    if (productCategory) {
      productCategory.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'Product Category deleted',
      });
    } else {
      res.status(404).send({
        message: 'Product Category not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};


exports.filter_index = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: ProductSubCategory,
        as: 'product_sub_categories',
        attributes: ['name', 'id'],
      },
      {
        model: Coupon,
        as: 'coupons',
        attributes: ['name', 'discount_percent', 'valid_from', 'expired_at'],
      }],
    });
    res.status(200).send({
      productCategories: productCategories,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
