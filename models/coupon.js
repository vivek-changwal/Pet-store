const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      this.belongsTo((models.ProductCategory), {
        as: 'ProductCategory',
        foreignKey: 'id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Coupon.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    name: {
      type: DataTypes.STRING,
    },
    discount_percent: {
      type: DataTypes.STRING,
    },
    valid_from: {
      type: DataTypes.DATE,
    },
    expired_at: {
      type: DataTypes.DATE,
    },
    product_category_id: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'Coupon',
    tableName: 'coupons',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Coupon;
};
