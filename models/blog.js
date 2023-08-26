const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      this.belongsTo((models.User), {
        as: 'user',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Blog.init({
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
    user_image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    post_image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Blog;
};
