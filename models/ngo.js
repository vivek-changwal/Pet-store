const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NGO extends Model {
    static associate(models) {
      this.belongsTo((models.User), {
        as: 'user',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  NGO.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    user_id: {
      type: DataTypes.UUID,
    },
    address: {
      type: DataTypes.STRING,
    },
    contact: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.TIME,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z]+$/,
        len: [2, 100],
      },
    },
  }, {
    sequelize,
    modelName: 'NGO',
    tableName: 'ngos',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return NGO;
};
