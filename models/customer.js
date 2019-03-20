module.exports = function (sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        burgers_eaten: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });

    Customer.associate = function (models) {
        Customer.hasMany(models.Burger, {
            onDelete: "cascade"
        });
    };
    return Customer;
}