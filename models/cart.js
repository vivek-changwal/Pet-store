const { Model } = require('sequelize');

let allModels;

const deliveryStatus = ['pending', 'processing', 'Viewed', 'Rejected', 'In process', 'Ready for dispatch', 'Dispatched', 'Delivered', 'Invoiced', 'Paid', 'Returned', 'Closed'];

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
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

    static beforeUpdate(instance, options) {
      if (instance.total_quantity < 0) {
        throw new Error('Total quantity cannot be negative');
      }
    }
  }

  Cart.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    total_quantity: {
      type: DataTypes.INTEGER,
    },
    total_amount: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.UUID,
      unique: {
        args: true,
      },
    },
    status: {
      type: DataTypes.ENUM(deliveryStatus),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Cart.registerAllModels = function (models) {
    allModels = models;
  };

  return Cart;
};
