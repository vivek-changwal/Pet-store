const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      this.belongsTo((models.User), {
        as: 'user',
        foreignKey: 'id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Address.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    user_id: {
      type: DataTypes.UUID,
      unique: {
        args: true,
      },
    },
    discrict: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    area: {
      type: DataTypes.STRING,
    },
    shipping: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Address;
};
