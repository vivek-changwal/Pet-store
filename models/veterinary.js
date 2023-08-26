const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Veterinary extends Model {
    static associate(models) {
      this.belongsTo((models.User), {
        as: 'user',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Veterinary.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    user_id: {
      type: DataTypes.UUID,
    },
    experience: {
      type: DataTypes.STRING,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Veterinary',
    tableName: 'veterinaries',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Veterinary;
};
