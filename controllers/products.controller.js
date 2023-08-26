const { Op } = require('sequelize');
const { getPagination, getPagingData } = require('../utilities/pagination');
const db = require('../models/index');
const serialize = require('../serializers/products.serializer');

const {
  Product, Feedback, ProductSubCategory, ProductCategory,
} = db;

exports.create = async (req, res) => {
  const productDetails = await Product.create(req.body).then((newProduct) => {
    const product = Product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: Feedback,
          as: 'feedbacks',
        }],
    });
    return product;
  });
  const responseData = await serialize.show(productDetails);
  res.status(201).send({
    product: responseData,
    message: 'product details created',
  });
};


exports.show = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Feedback,
          as: 'feedbacks',
        }],
    });
    const responseData = await serialize.show(product);
    res.status(200).send({
      product: responseData,
    });
  } catch (error) {
    res.status(404).send({
      message: 'product data not found.',
    });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Feedback,
          as: 'feedbacks',
        }],
    });
    product.update(req.body).then(() => {
      serialize.show(product).then((responseData) => {
        res.status(202).send({
          product: responseData,
        });
      });
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.destroy({
        where: { id: req.params.id },
      });
      res.status(202).send({
        message: 'Products deleted',
      });
    } else {
      res.status(404).send({
        message: 'Products not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter_index = async (req, res) => {
  const {
    page, size, price, name, brand,
  } = req.query;
  const brandFilter = brand ? { [Op.iLike]: `%${brand}%` } : null;
  const nameFilter = name ? { [Op.iLike]: `%${name}%` } : null;
  const priceFilter = price ? { [Op.iLike]: `%${price}%` } : null;
  const { limit, offset } = getPagination(page, size);
  try {
    const products = await Product.findAndCountAll({
      where: {
        ...brandFilter && { brand: brandFilter },
        ...nameFilter && { name: nameFilter },
        ...priceFilter && { price: priceFilter },
      },
      include: [
        {
          model: ProductSubCategory,
          as: 'product_sub_category',
          attributes: ['name', 'id'],
          include: [
            { model: ProductCategory, as: 'product_category', attributes: ['name'] },
          ],
        }],
      attributes: ['id', 'name', 'size', 'price', 'quantity', 'weight', 'total_price', 'description', 'brand'],
      limit,
      offset,

    });

    const pagingData = getPagingData(products, page, limit);
    res.status(200).send({
      products: products,
      pagingData,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
