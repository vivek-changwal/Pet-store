const db = require('../../models/index');
const { Api422Error } = require('../../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../../utilities/Errors/BaseError');

const { Product, ProductSubCategory, ProductCategory } = db;

exports.create = async (req, res) => {
  const productDetails = await Product.create(req.body).then((newProduct) => {
    const product = Product.findOne({
      where: {
        id: newProduct.id,
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
    });
    return product;
  });
  res.status(201).send({
    product: productDetails,
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
          model: ProductSubCategory,
          as: 'product_sub_category',
          attributes: ['name', 'id'],
          include: [
            { model: ProductCategory, as: 'product_category', attributes: ['name'] },
          ],
        }],
      attributes: ['name', 'size', 'price', 'quantity', 'weight', 'total_price', 'description', 'brand'],
    });
    res.status(200).send({
      product: product,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.filter = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductSubCategory,
          as: 'product_sub_category',
          attributes: ['name', 'id'],
          include: [
            { model: ProductCategory, as: 'product_category', attributes: ['name', 'id'] },
          ],
        }],
      order: [['created_at', 'DESC']],
    });
    res.status(200).send({
      products: products,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.update(req.body);
      res.status(202).send({
        product: product,
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
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
        message: 'Product deleted',
      });
    } else {
      res.status(404).send({
        message: 'Product not found.',
      });
    }
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
