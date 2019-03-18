var express = require("express");

var router = express.Router();

var burger = require("../models/burger.js");

// Get request to retrieve the burgers from the database and then render the results to the page.
router.get("/", function(req, res) {

    // Function that selects all from the burgers table.
    burger.selectAll(function(data) {

        // Creating an object with a key of burgers and giving it the value of the results that were returned from the query.
        var burgerObj = {
            burgers: data
        };
        
        res.render("index", burgerObj);
    });
});

// Handles the post request. Using the data from the Ajax request, add a new burger to the table.
router.post("/api/burgers", function(req, res) {

    // Function that acts as the INSERT INTO query.
    burger.insertOne(["burger_name", "devoured"], [req.body.name, false], function(results) {

        res.json({id: results.insertId});
    });
});

// Handles the put request for updating the state of the burger (eaten or not).
// Uses the data from the Ajax request to change the burgers 'devoured' boolean value to true.
router.put("/api/burgers/:id", function(req, res) {

    // Creating a variable that acts as the query's condition. In this case, where the burger's id is equal to the route's id.
    var condition = "id = " + req.params.id;

    // Creating a variable that is the burgers new devoured value. Now the burger's devoured value is set to true.
    var newState = "devoured = " + req.body.devoured;

    // Function that acts as the UPDATE query. Passing in the values above as the arguements.
    burger.updateOne(newState, condition, function(results) {

        if (results.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

module.exports = router;