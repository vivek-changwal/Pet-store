module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ngos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
      },
      contact: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.TIME,
      },
      name: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('ngos');
  },
};

