const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo((models.chatRoom), {
        as: 'chat_room',
        foreignKey: 'chat_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.User), {
        as: 'sender',
        foreignKey: 'sender_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
      this.belongsTo((models.User), {
        as: 'receiver',
        foreignKey: 'receiver_id',
        constraints: true,
        onDelete: 'CASCADE',
      });
    }
  }
  Message.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    chat_id: {
      type: DataTypes.UUID,
    },
    sender_id: {
      type: DataTypes.UUID,
    },
    receiver_id: {
      type: DataTypes.UUID,
    },
    content: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Message;
};
