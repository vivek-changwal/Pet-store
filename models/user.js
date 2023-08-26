const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

const userGender = ['Male', 'Female', 'Others'];
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany((models.Address), {
        as: 'addresses',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasOne((models.Cart), {
        as: 'cart',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Order), {
        as: 'orders',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.chatRoom), {
        as: 'chat_room',
        foreignKey: 'id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Message), {
        as: 'message',
        foreignKey: 'chat_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Feedback), {
        as: 'feedbacks',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Pet), {
        as: 'pets',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Blog), {
        as: 'blogs',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasOne((models.NGO), {
        as: 'NGO',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasMany((models.Event), {
        as: 'events',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.hasOne((models.Veterinary), {
        as: 'veterinary',
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[A-Za-z]+$/,
        len: [2, 50],
      },
    },
    last_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        is: /^[A-Za-z]+$/,
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!',
      },
    },
    password: {
      type: DataTypes.STRING(250),
      set(value) {
        if (value) {
          this.setDataValue('password', bcrypt.hashSync(value, 10));
        }
      },
    },
    reset_token: {
      type: DataTypes.STRING(250),
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING(15),
    },
    gender: {
      type: DataTypes.ENUM(userGender),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  });
  return User;
};
