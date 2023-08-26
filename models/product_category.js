const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      this.hasMany((models.ProductSubCategory), {
        as: 'product_sub_categories',
        foreignKey: 'product_category_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Coupon), {
        as: 'coupons',
        foreignKey: 'product_category_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }

  ProductCategory.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'product_categories',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return ProductCategory;
};
