// 1. require and import "mysql" and "inquirer"
var mysql = require("mysql");
var inquirer = require("inquirer");
const { response } = require("express");

// 2. Create the MySQL `connection` object.
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "!!MYSQLfukk69",
  database: "employeeTracker_DB"
});

// 3. Connect to the MySQL database and THEN `prompt` the user for an action
//
//  - Action Choices: "POST", "BID", "EXIT"
// connection.connect(function(err) {
//     if (err) throw err;
//     auctionPrompt();
// });

connection.connect(function(err) {
    if (err) throw err;
    auctionPrompt();
})

function auctionPrompt() { 
    inquirer.prompt({
        name: "chooseAction",
        type:"list",
        message: "would you like to [post] an item, or [bid] on an item?",
        choices: [ "post", "bid", "exit" ]
    })
    .then( function( response ) {
        if ( response.chooseAction === "post" ) {
            postAuction();
        } else if ( response.chooseAction === "bid" ) {
            bidAuction();
        } else {
            connection.end();
        }
    });
}

function postAuction() {
//  - IF "POST" THEN `prompt` the users for information about a new auction item and add it to the database (C - CREATE)
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the item you would like to submit?"
        },
        {
            name: "category",
            type: "input",
            message: "What category would you like to place your auction in?"
        },
        {
            name: "startingBid",
            type: "input",
            message: "What would you like your starting bid to be?",
        }
    ]).then( function( response ) {
        console.log("Inserting a new product...\n");
        var query = connection.query(
        "INSERT INTO auctions SET ?",
        {
            item_name: response.item,
            category: response.category,
            starting_bid: response.startingBid,
            highest_bid: response.startingBid
        },
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " item inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            auctionPrompt();
        }
    );
    console.log(query.sql);
    });
  
    // logs the actual query being run
    
}

function bidAuction() {

//      - `SELECT` all existing items from the database (R - READ)
    connection.query("SELECT * FROM auctions", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // console.log(res[0].item_name);
        
        // define array and push value from items
        var sqlResponse = [];

        for (let i = 0; i < res.length; i++ ) {
            sqlResponse.push(res[i].item_name);
        }
        

    //      - THEN `prompt` the user for which one they want to bid on and how much they want to bid (You'll need to make a list of choices using the results from the SELECT)
        inquirer.prompt([
            {
                name: "item",
                type: "list",
                message: "What item would you like to bid on?",
                choices: sqlResponse
            },
            {
                name: "bid",
                type: "input",
                message: "how much would you like to bid?"
            }
        ]).then( function( response ) {
            if ( parseInt( response.bid ) > parseInt( res[sqlResponse.indexOf( response.item )].highest_bid )) {
                var query = connection.query(
                    "UPDATE auctions SET ? WHERE ?",
                    [
                        {
                            highest_bid: response.bid,
                        },
                        {
                            item_name: response.item,
                        }
                    ],
                    function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " item highest bid updated!\n");
                        // Call updateProduct AFTER the INSERT completes
                        auctionPrompt();
                    }
                );
            } else { 
                console.log( "bid is too low, try again" );
                bidAuction();
            }
    
    });
//      - THEN check if the provided bid is higher then the saved amount
//          - IF the bid is higher THEN `UPDATE` the item and `console.log` "Bid placed successfully!" (U - UPDATE)
//          - ELSE `console.log` "Your bid was too low. Try again..."

    });
}