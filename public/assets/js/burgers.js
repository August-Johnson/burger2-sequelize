$(function () {
    // Listens for a eat-burger button event, then updates the burger's devoured value to true.
    $(".eat-burger").on("click", function (event) {

        // Getting an id value from the burger whose button was just clicked.
        var id = $(this).data("id");

        // Creating an object with the key value of its new devoured boolean, to reference from the controller.
        var burgerObj = {
            devoured: true
        };

        // Ajax PUT call. Passing in the id from what we established it as earlier, and then sending the object data/values we created.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: burgerObj
        }).then(function () {

            console.log("Burger with id of " + id + " has been eaten!");
            location.reload();
        });
    });

    // Listens for the submit button even. Adds a new burger to the table/database, using the value inside the text area as the burger's name.
    $(".create-burger").on("submit", function (event) {
        event.preventDefault();

        // Creating an object of the new burger with a key value of its name, to reference in the controller.
        var newBurger = {
            name: $("#burg").val().trim(),
        };

        // Ajax POST request. Sending the object representing the new burger you just added as the data.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {

            console.log("Added burger " + newBurger.name);
            location.reload();
        });
    });
});