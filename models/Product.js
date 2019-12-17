module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define(
    "Product",
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      stock_quantity: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
  );
  return Product;
};
