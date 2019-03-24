var db = require("../models");

module.exports = function (app) {

    // Gets all burgers from the table and displays them to the page using index.handlebars
    app.get("/", function (req, res) {
        db.Burger.findAll({ include: [db.Customer] }).then(function (results) {

            res.render("index", { burgers: results });
        });
    });

    // Gets the data from the burgers table and displays it as json.
    app.get("/api/burgers", function (req, res) {
        db.Burger.findAll({ include: [db.Customer] }).then(function (results) {
            res.json(results);
        });
    });

    // Listens for the post request of adding a new burger. Adds the new burger to the table using the data being passed (burger_name).
    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            burger_name: req.body.name
        }).then(function (results) {
            res.json(results);
        });
    });

    // Gets all the customers from the table and includes the burgers that they have eaten.
    app.get("/api/customers", function (req, res) {
        db.Customer.findAll({ include: [db.Burger] }).then(function (results) {
            res.json(results);
        });
    });

    // Updating the values of the burger that was 'eaten'. The devoured state is updated to true and they are given the customer id of the customer entered.
    app.put("/api/burgers/:id", function (req, res) {
        // Finds the customer with the name of what was entered in the field.
        db.Customer.findAll({
            where: {
                customer_name: req.body.customerName
            }
        }).then(function (results) {
            if (results.length > 0) {
                // If there is a customer with that name (if they exist), run the function that 'eats' the burger and updates its values.
                eatBurger(results[0].id, req.params.id, res);
            }
            else {
                // If that user doesn't exist, create the user and then find them to grab their specific data. Then run the function to eat the burger.
                db.Customer.create({
                    customer_name: req.body.customerName
                }).then(function (results) {

                        eatBurger(results.id, req.params.id, res);
            
                });
            }
        });
    });

};

// Function that 'eats' the burger. Will be passed the values of the customer's id, the burger being eaten's id and the res from the initial PUT request.
function eatBurger(customerId, burgerId, res) {
    db.Burger.update({
        devoured: true,
        CustomerId: customerId
    },
        {
            where: {
                id: burgerId
            }
        }).then(function (results) {
            res.json(results);
        });
}