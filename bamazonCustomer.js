var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
    database: "bamazon_db"

});

connection.connect(function (error) {
    if (error) throw error;
    displayItems();
});

function displayItems() {
    connection.query("SELECT * FROM products", function (error, res) {
        if (error) throw error;
        console.log("Id \tName \t \t \tPrice \tQuantity\n");
        for (var i = 0; i < res.length; i++) {
            console.log(
                res[i].item_id + "\t" +
                res[i].product_name + "\t \t" +
                res[i].price + "\t" +
                res[i].stock_quantity + "\n");
        }
        promptUser(res.length);
    });

};

function promptUser(length) {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Enter the item number of the product you would like to purchase."
        }
    ])
        .then(function (answer) {
            var purchaseItem = answer.item_id;
            if (purchaseItem.toUpperCase() === "C") {
                process.exit();
            }
            inquirer.prompt([
                {
                    name: "quantity",
                    type: "input",
                    message: "How many of this product would you like to purchase?"
                }
            ])
                .then(function (answer) {
                    if (purchaseItem > length + 1 || isNaN(purchaseItem) || isNaN(answer.quantity)
                    ) {
                        if (purchaseItem > length + 1 || isNaN(purchaseItem)) {
                            console.log("The ID is not valid");
                        }

                        if (isNaN(answer.quantity)) {
                            console.log("Please enter a valid quantity");
                        }

                        displayItems();
                    } else {
                        connection.query("select stock_quantity, price from products where item_id = ?",
                            [purchaseItem],
                            function (error, res) {
                                if (error) throw error;
                                if (answer.quantity > res[0].stock_quantity) {
                                    console.log("Sorry there is insuffiecient quantity");
                                } else {
                                    var updateQuantity = res[0].stock_quantity - parseFloat(answer.quantity);
                                    connection.query(
                                        "update products set ? where ?",
                                        [{
                                            stock_quantity: updateQuantity
                                        },
                                        {
                                            item_id: purchaseItem
                                        }
                                        ],
                                        function (error, res) {
                                            if (error) throw error;
                                        }
                                    );
                                    var totalCost = res[0].price * answer.quantity;
                                    console.log("The total price of the purchase: " + totalCost.toFixed(2)
                                    );
                                }
                                displayItems();
                            }
                        );
                    }
                });
        });
}
