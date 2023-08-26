const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    static associate(models) {
      this.belongsTo((models.User), {
        as: 'user',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Events.init({
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
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    organised_by: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    location: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
    contact: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'events',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Events;
};
