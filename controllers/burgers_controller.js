var db = require("../models");

// Get request to retrieve the burgers from the database and then render the results to the page.
module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Burger.findAll({ include: [db.Customer] }).then(function (results) {

            res.render("index", {burgers: results});
        });
    });

    // Get route for getting all of the burgers and thier customer if they have one.
    app.get("/api/burgers", function (req, res) {
        db.Burger.findAll({ include: [db.Customer] }).then(function (results) {
            res.json(results);
        });
    });

    // Handles the post request. Using the data from the Ajax request, add a new burger to the table.
    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            burger_name: req.body.name
        }).then(function (results) {
            res.json(results);
        });
    });

    // Handles the put request for updating the state of the burger (eaten or not).
    // Uses the data from the Ajax request to change the burgers 'devoured' boolean value to true.
    app.put("/api/burgers/:id", function (req, res) {
        db.Burger.update({
            devoured: req.body.devoured,
            CustomerId: req.body.customerId
        },
            {
                where: {
                    id: req.params.id
                }
            }).then(function (results) {
                res.json(results);
            });
    });
};

// TABLE OF CUSTOMERS SHOWING ALL OF THEM AND THEIR 'STATS' (BURGERS EATEN ETC).
// EACH BURGER EATEN HAS A CUSTOMERS NAME NEXT TO IT.