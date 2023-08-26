const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo((models.ProductSubCategory), {
        as: 'product_sub_category',
        foreignKey: 'product_sub_category_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.CartItem), {
        as: 'cart_items',
        foreignKey: 'id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Feedback), {
        as: 'feedbacks',
        foreignKey: 'product_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    product_sub_category_id: {
      type: DataTypes.UUID,
    },
    size: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z]+$/,
        len: [2, 50],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    total_price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Product;
};
