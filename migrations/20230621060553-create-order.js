const deliveryStatus = ['processing', 'shipping', 'delieverd', 'cancel'];
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      total_amount: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM(deliveryStatus),
        defaultValue: 'processing',
      },
      user_id: {
        type: Sequelize.UUID,
      },
      cart_id: {
        type: Sequelize.UUID,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
