const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate(models) {
      this.belongsTo((models.User), {
        as: 'user',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Pet.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    user_id: {
      type: DataTypes.UUID,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z]+$/,
        len: [2, 50],
      },
    },
    colour: DataTypes.STRING,
    life_expectancy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    breed: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Pet;
};
