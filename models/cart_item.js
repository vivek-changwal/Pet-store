const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      this.belongsTo((models.Product), {
        as: 'products',
        foreignKey: 'product_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.Cart), {
        as: 'cart',
        foreignKey: 'cart_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.Order), {
        as: 'orders',
        foreignKey: 'cart_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  CartItem.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    cart_id: {
      type: DataTypes.UUID,
    },
    product_id: {
      type: DataTypes.UUID,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return CartItem;
};
