var express = require("express");

var router = express.Router();

var Burger = require("../models/burger.js");

// Get request to retrieve the burgers from the database and then render the results to the page.
router.get("/", function (req, res) {
    Burger.findAll({}).then(function (results) {

        res.render("index", results);
    });
});

// Handles the post request. Using the data from the Ajax request, add a new burger to the table.
router.post("/api/burgers", function (req, res) {
    Burger.create({
        burger_name: req.body.name
    }).then(function (results) {
        res.json(results);
    });
});

// Handles the put request for updating the state of the burger (eaten or not).
// Uses the data from the Ajax request to change the burgers 'devoured' boolean value to true.
router.put("/api/burgers/:id", function (req, res) {
    Burger.update({
        devoured: true
    },
        {
            where: {
                id: req.params.id
            }
        }).then(function (results) {
            res.json(results);
        });
});

module.exports = router;