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

    // Listens for the put request when the user 'eats' a burger. Updates the devoured boolean value to true.
    // app.put("/api/burgers/:id", function (req, res) {
    //     db.Burger.update({
    //         devoured: req.body.devoured
    //     },
    //         {
    //             where: {
    //                 id: req.params.id
    //             }
    //         }).then(function (results) {
    //             res.json(results);
    //         });
    // });

    app.get("/api/customers", function (req, res) {
        db.Customer.findAll({ include: [db.Burger] }).then(function (results) {
            res.json(results);
        });
    });


    app.put("/api/burgers/:id", function (req, res) {
        db.Customer.findAll({
            where: {
                customer_name: req.body.customerName
            }
        }).then(function (results) {
            
            if (results.length > 0) {
                db.Burger.update({
                    devoured: true,
                    CustomerId: results[0].id
                },
                    {
                        where: {
                            id: req.params.id
                        }
                    }).then(function (results) {
                        res.json(results);
                    });
            }
            else {
                db.Customer.create({
                    customer_name: req.body.customerName
                }).then(function (results) {
                    res.json(results);
                });
            }
        });
    });

};