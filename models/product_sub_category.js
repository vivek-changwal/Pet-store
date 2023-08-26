const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductSubCategory extends Model {
    static associate(models) {
      this.belongsTo((models.ProductCategory), {
        as: 'product_category',
        foreignKey: 'product_category_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Product), {
        as: 'products',
        foreignKey: 'product_sub_category_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  ProductSubCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.literal('uuid_generate_v4()'),
      },
      product_category_id: {
        type: DataTypes.UUID,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ProductSubCategory',
      tableName: 'product_sub_categories',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );
  return ProductSubCategory;
};
