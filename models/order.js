const {
  Model,
} = require('sequelize');

const deliveryStatus = ['processing', 'shipping', 'delieverd', 'cancel'];

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.CartItem), {
        as: 'cart_items',
        foreignKey: 'cart_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    total_amount: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(deliveryStatus),
    },
    cart_id: {
      type: DataTypes.UUID,
    },
    user_id: {
      type: DataTypes.UUID,
      unique: {
        args: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Order;
};
