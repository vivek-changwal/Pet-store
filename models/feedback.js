const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      this.belongsTo((models.User), {
        as: 'user',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.Product), {
        as: 'product',
        foreignKey: 'id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Feedback.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    product_id: {
      type: DataTypes.UUID,
    },
    feedback: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.UUID,
      unique: {
        args: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedbacks',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Feedback;
};
