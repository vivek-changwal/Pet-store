const db = require('../models/index');
const serialize = require('../serializers/product_sub_category.serializer');
const { Api422Error } = require('../utilities/Errors/error.handler');
const { httpStatusCodes } = require('../utilities/Errors/BaseError');

const { ProductSubCategory, Product, ProductCategory } = db;

exports.create = async (req, res) => {
  try {
    const subCategoryDetails = await ProductSubCategory.create(req.body);
    const productSubCategory = await ProductSubCategory.findOne({
      where: {
        id: subCategoryDetails.id,
      },
      include: [{
        model: Product,
        as: 'products',
      }],
    });
    const responseData = await serialize.show(productSubCategory);
    res.status(201).send({
      product_sub_category: responseData,
      message: 'Product Sub Category details created',
    });
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const productSubCategory = await ProductSubCategory.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'product_category_id'],
      include: [{
        model: Product,
        as: 'products',
      }, {
        model: ProductCategory,
        as: 'product_category',
        attributes: ['name', 'id'],
      }],
    });
    if (productSubCategory) {
      res.status(200).send({
        product_sub_category: productSubCategory,
      });
    } else {
      res.status(404).send({
        message: 'Product Sub Category not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};


exports.update = async (req, res) => {
  try {
    const productSubCategory = await ProductSubCategory.findByPk(req.params.id, {
      include: [{
        model: ProductCategory,
        as: 'product_category',
        attributes: ['name', 'id'],
      }],
    });

    if (productSubCategory) {
      await productSubCategory.update(req.body);

      if (req.body.product_category) {
        const productCategory = await ProductCategory.findByPk(productSubCategory.product_category_id);
        await productCategory.update(req.body.product_category);
      }

      res.status(202).send({
        product_sub_category: productSubCategory,
      });
    } else {
      res.status(404).send({
        message: 'Product Sub Category not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const productSubCategory = await ProductSubCategory.findByPk(req.params.id);
    if (productSubCategory) {
      await productSubCategory.destroy();
      res.status(202).send({
        message: 'Product Sub Category deleted',
      });
    } else {
      res.status(404).send({
        message: 'Product Sub Category not found.',
      });
    }
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
};

exports.filter_index = async (req, res) => {
  try {
    const productSubCategories = await ProductSubCategory.findAll({
      attributes: ['id', 'name', 'product_category_id'],
      include: [{
        model: Product,
        as: 'products',
        attributes: ['brand', 'size', 'price', 'name', 'quantity', 'weight', 'image', 'total_price', 'description'],
      },
      {
        model: ProductCategory,
        as: 'product_category',
        attributes: ['name', 'id'],
      },
      ],
    });
    res.status(200).send({
      productSubCategories: productSubCategories,
    });
  } catch (error) {
    res.status(httpStatusCodes.UNPROCESSABLE).send({
      message: new Api422Error(error.message),
    });
  }
};
