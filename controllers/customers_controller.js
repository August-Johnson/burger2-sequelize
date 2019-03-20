var db = require("../models");

// Get request to retrieve the burgers from the database and then render the results to the page.
module.exports = function (app) {

    // app.get("/customers", function (req, res) {
    //     db.Customer.findAll({ include: [db.Burger] }).then(function (results) {

    //         res.render("customer-list", {customers: results});
    //     });
    // });

    // Get route for getting all of the burgers and their customer if they have one.
    app.get("/api/customers", function (req, res) {
        db.Customer.findAll({ include: [db.Burger] }).then(function (results) {
            res.json(results);
        });
    });

    // Handles the post request. Using the data from the Ajax request, add a new burger to the table.
    app.post("/api/customers", function (req, res) {
        db.Customer.create({
            customer_name: req.body.name
        }).then(function (results) {
            res.json(results);
        });
    });

};

// TABLE OF CUSTOMERS SHOWING ALL OF THEM AND THEIR 'STATS' (BURGERS EATEN ETC).
// EACH BURGER EATEN HAS A CUSTOMERS NAME NEXT TO IT.