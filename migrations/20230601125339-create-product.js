

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      product_sub_category_id: {
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING(50),
      },
      price: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      weight: {
        type: Sequelize.INTEGER(4),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(150),
      },
      total_price: {
        type: Sequelize.INTEGER(5),
      },
      description: {
        type: Sequelize.STRING(200),
      },
      brand: {
        type: Sequelize.STRING(20),
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
    await queryInterface.dropTable('products');
  },
};

