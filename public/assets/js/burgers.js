$(function () {
    // Listens for when the 'devour' button has been clicked, then updates the burger's devoured value to true.
    $(".eat-burger").on("click", function (event) {
        event.preventDefault();

        // Getting an id value from the burger whose button was just clicked.
        var id = $(this).data("id");

        // Getting the name of the customer from the input field of the burger that was just eaten.
        var customerName = $(".customer-name" + id).val().trim();

        // Creating an object with the key value of the customer's name who is eating it.
        var burgerObj = {
            customerName: customerName
        };

        // Ajax PUT request. Passing in the id to the targeted URL and then sending the object data/values we created.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: burgerObj
        }).then(function () {

            console.log("Burger with id of " + id + " has been eaten!");
            location.reload();
        });
    });

    // Listens for the submit button event. Adds a new burger to the burgers table in the database, using the value inside the text area as the burger's name.
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