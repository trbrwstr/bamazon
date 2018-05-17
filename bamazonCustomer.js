var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    printProducts();
});

function printProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

function promptUser() {
    console.log("Welcome to Bamazon!");
    inquirer.prompt([{
        type: "input",
        message: "Please enter the item_id of the item you'd like to purchase",
        name: "itemId"
    }, {
        type: "input",
        message: "How many of the item would you like to purchase?",
        name: "quantityItem"
    }]).then(function (inquirerResponse) {
        connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [inquirerResponse.itemId], function (err, res) {
            if (err) throw err;
            var stockQuantity = parseInt(res[0].stock_quantity);
            if (inquirerResponse.quantityItem > stockQuantity) {
                console.log("sorry we dont have enough of that item! Please startover!");
                printProducts();
            }
            else {
                stockQuantity = stockQuantity - parseInt(inquirerResponse.quantityItem);
                connection.query("UPDATE products SET ? WHERE ?", [{ "stock_quantity": stockQuantity }, { "item_id": inquirerResponse.itemId }], function (err, res) {
                    if (err) throw err;
                    connection.query("SELECT product_name FROM products WHERE item_id = ?", [inquirerResponse.itemId], function (err, res) {
                        if (err) throw err;
                        console.log("Thank you for your purchase of " + inquirerResponse.quantityItem + " " + res[0].product_name + "(s)")
                        inquirer.prompt({
                            type: "list",
                            message: "Would you like to do more shopping?",
                            choices: ["Yes", "No"],
                            name: "userChoice"
                        }).then(function (inquirerResponse) {
                            if (inquirerResponse.userChoice === "Yes") {
                                printProducts();
                            } else {
                                console.log("Thank you for using Bamazon");
                                connection.end();

                            }
                        })


                    })
                })
            }
        })
    })
}