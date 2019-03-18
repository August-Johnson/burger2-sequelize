var orm = require("../config/orm.js");

// Making a burger model with specified values, using the ORM functions. 
// The table 'burgers' is hard-coded in for this object because it will always be referencing the burgers table from the database.
var burger = {
    // Selecting all from the burgers table.
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },
    // Adding a new burger to the table.
    insertOne: function (columns, values, cb) {
        orm.insertOne("burgers", columns, values, function (res) {
            cb(res);
        });
    },
    // Updating the state of a burger.
    updateOne: function (newColumnValue, condition, cb) {
        orm.updateOne("burgers", newColumnValue, condition, function (res) {
            cb(res);
        });
    }
};

module.exports = burger;