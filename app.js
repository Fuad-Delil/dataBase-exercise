// Working with databases (MySql) - Practice Exercises
// ! Question 1:
// Create a MySQL database by the name "myDB" and create a database user by
// the name "myDBuser" with a permissions to connect with the "myDB" database. Use the
// "mysql" module to create a connection with the newly created database. Display console
// message if the connection is successful or if it has an error.
// Please find further instructions under the “Instructions for question 1” below.
//!  // !Instructions for question 1
// ● To create your database and username, you will need to start your MAMP or WAMP
// application and to access your MySQL. Please make sure to remember the username
// and password you used when you create the database user.
// ● You will need a custom module ( example, “app.js”) to write the code that connects
// your MySQL database to your MySQL database server
// ● Once you create your database, you will use Node to manipulate your database.
// However, for Node to be able to access your database, you need a MySQL driver, a
// module that creates a connection between Node and the MySQL database you
// created
// ○ Make sure to install the "mysql" driver module from npm and import it in your
// “app.js” before writing a Node script to create a connection with the database
// you created.
// ○ You will need your database name, username and user password credentials to
// allow Node to access your database.
// ● Now, connect to the MySQL database server. It is a good practice to always display a
// message using console to make sure there is a successful connection to the MySQL
// database server from your Node.js application
// ● run your app (type the “node app.js” command)
// ● Make sure to always keep your server running after updating your app.js module with
// a new code
// ● It is highly recommended, especially for this week’s practice exercise, that you code
// along while watching your class videos.

// const mysql = require("mysql2");
// const myDBConnetion = mysql.createConnection({
//   user: "myDBuser",
//   password: "myDBuser",
//   host: "localhost",
//   database: "myDB",
// });
// myDBConnetion.connect((err) => {
//   if (err) console.log(err.message);
//   else
//     console.log(
//       "Now your Node.js app is connected to the MySQL database, ready to insert, select, update, or delete data."
//     );
// });

// !  Question 2:
// Here is a link to a document that contains the tables we need to create and
// convert the apple.com/iphones page into a dynamic page with a database. As you can see
// from the document, there are 5 tables that are needed (please scroll horizontally and
// vertically over the document to see all the 5 tables). Write a SQL query to create the
// apple.com tables inside of the "myDB" database you created above. Once you write the
// queries, use the "mysql" module to execute the queries on the database. Try both of these
// methods to initiate the execution of the queries:
// ● Include the execution code directly in the module to be executed as you run the app
// ● Use the Express module to receive requests. Configure your module in a way that it
// executes the queries when the "/install" URL is visited.
// Please find further instructions under the “Instructions for question 2” below.

// Instructions for question 2
// ● We need Express server to serve the table data upon a request with the URL of
// “/install”. Therefore, before creating a server, make sure to install Express from NPM
// and import it into your “app.js” module.
// ● You will then write a SQL query to create tables from your Node app when the
// "/install" URL is visited.
// ○ Please watch out for syntax errors line by line. From past experiences, we have
// seen a lot of students struggling to create tables due to misspelling, missing a
// comma or semicolon.
// ● Make sure to execute the query you wrote to create your tables and show either an
// error message or a message showing creation of tables when the "/install" URL is
// visited.
// ● run your app. Make sure to always keep your server running
// ● Make sure your MySQL database is also on (meaning, your MAMP/WAMP needs to
// be started)
// Now run your localhost in your browser and visit the /install" URL. Make sure to also
// include the port number you provided for your Express server.

// ! answer 2
const mysql = require("mysql2");
const express = require("express");
var cors = require("cors");
const body_parser = require("body-parser");

var app = express();
app.use(cors());
// Middleware to parse URL-encoded form data
app.use(body_parser.urlencoded({ extended: true }));
// Middleware to parse JSON data
app.use(body_parser.json());

const myDBConnetion = mysql.createConnection({
  user: "myDBuser",
  password: "myDBuser",
  host: "localhost",
  database: "myDB",
});
myDBConnetion.connect((err) => {
  if (err) console.log(err.message);
  else
    console.log(
      "Now your Node.js app is connected to the MySQL database, ready to insert, select, update, or delete data."
    );
});

// Install: Create the tables necessary
app.get("/install", (req, res) => {
  let productTable = `CREATE TABLE IF NOT EXISTS Products (
    product_id INT AUTO_INCREMENT,
    product_url VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (product_id)
  )`;

  let productDescriptionTable = `CREATE TABLE IF NOT EXISTS ProductDescription (
    description_id INT AUTO_INCREMENT,
    product_id INT(11) NOT NULL,
    product_brief_description TEXT NOT NULL,
    product_description TEXT NOT NULL,
    product_img VARCHAR(255) NOT NULL,
    product_link VARCHAR(255) NOT NULL,
    PRIMARY KEY (description_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;

  let productPriceTable = `CREATE TABLE IF NOT EXISTS ProductPrice (
    price_id INT AUTO_INCREMENT,
    product_id INT(11) NOT NULL,
    price_range VARCHAR(255) NOT NULL,
    starting_price VARCHAR(255) NOT NULL,
    PRIMARY KEY (price_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
  )`;

  let orderTable = `CREATE TABLE IF NOT EXISTS Orders (
    order_id INT AUTO_INCREMENT,
    product_id INT(11) NOT NULL,
    user_id INT(11) NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
  )`;

  let userTable = `CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

  // Create tables in the right order
  myDBConnetion.query(productTable, (err) => {
    if (err) return console.log("Product Table Error:", err.message);
  });
  myDBConnetion.query(userTable, (err) => {
    if (err) return console.log("User Table Error:", err.message);
  });
  myDBConnetion.query(productDescriptionTable, (err) => {
    if (err) return console.log("Description Table Error:", err.message);
  });
  myDBConnetion.query(productPriceTable, (err) => {
    if (err) return console.log("Price Table Error:", err.message);
  });
  myDBConnetion.query(orderTable, (err) => {
    if (err) return console.log("Order Table Error:", err.message);
  });

  res.end(
    `<h1 style='background-color:brown; border-bottom:24px solid green; color:gold; font-weight:bold; padding: 20px;'>Tables Created</h1>`
  );
});


app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server Listening to : 5000");
  }
});

// Question 3: Create an HTML file called, “index.html” with a form to populate the
// "products" table you created above.
// ● The form on the HTML page should send a POST request to a URL named
// "/add-product"
// ● Use Express to receive the POST request
// ● Use the body-parser module to parse the POST request sent to your Express server
// ● Write a SQL query to insert the data received from the HTML form into the
// "products" table
// Please find further instructions under the “Instructions for question 3” below
// !Instructions for question 3
// ● This question is basically asking you to write a query that adds all the information
// entered into the HTML form into your products table (in your database) when you
// run your localhost in your browser using the “/addiphones” URL
// ● You will need to include the correct URL address in your form’s “action” attribute.
// Make sure this URL address includes the correct port number that matches the port
// number you used when you created your Express server
// ● Install the body-parser module from NPM and import it into your app. body-parser is
// a module that captures all the information entered in an HTML form and parses
// (separates them into easily processed units) them in an object form. Because the data
// from HTML forms are now in an object form, it will become easy to access them.
// ● Install the CORS module from NPM and import it into your app. Web browsers by
// default don't allow cross-origin resource sharing/CORS. CORS is a built-in browser
// security feature that protects unknown websites from accessing/using your website's
// resources. You need the CORS module installed to allow your Express server to have
// access to the form URL.Now you will write a SQL query to insert the data received from the HTML form into
// the "products" table
// ● Make sure to execute the query you wrote to insert the data. Please show either an
// error message or a message showing the insertion of form data into your tables when
// the “/addiphones” URL is visited.
// ● Open your HTML file in your browser, fill out the form and submit it.
// ● Now, go to your database. If there is no error, you will see the information from the
// HTML form inserted into the respective tables in your dNow you will write a SQL

// Insert a new iPhone
app.post("/add-product", (req, res) => {
  // // products table
  // let product_name = req.body.product_name;
  // let product_url = req.body.product_url;
  // // product_description table
  // let product_brief_description = req.body.product_brief_description;
  // let product_description = req.body.product_description;
  // let product_img = req.body.product_img;
  // let product_link = req.body.product_link;
  // // ProductPrice table
  // let starting_price = req.body.starting_price;
  // let price_range = req.body.price_range;

  const {
    product_name,
    product_url,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
  } = req.body;

  let insertProduct = `INSERT INTO products (product_url,product_name) VALUES ("${product_url}", "${product_name}") ;`;

  myDBConnetion.query(insertProduct, (err) => {
    if (err) {
      console.log(err.message);
      res.end(err.message);
    }
  });
  const selectPID = `SELECT product_id FROM products WHERE product_name = "${product_name}"`;

  myDBConnetion.query(selectPID, (err, result) => {
    const PId = result[0].product_id;
    if (err) {
      console.log(err.message);
      res.end(err.message);
    } else {
      let insert_product_des = `INSERT INTO ProductDescription(product_id,product_brief_description,product_description,product_img,product_link) VALUES (${PId},"${product_brief_description}","${product_description}","${product_img}","${product_link}")`;

      let insert_Product_price = `INSERT INTO ProductPrice(product_id,starting_price,price_range) VALUES ("${PId}","${starting_price}", "${price_range}") ;`;

      myDBConnetion.query(insert_product_des, (err) => {
        if (err) {
          console.log(err.message);
          res.end(err);
        }
      });

      myDBConnetion.query(insert_Product_price, (err) => {
        if (err) {
          console.log(err.message);
          res.end(err);
        }
      });
    }
    res.send(`<h1 style='background-color:brown; border-bottom:24px solid green; color:gold; font-weight:bold; padding: 20px;'>data inserted </h1>`);
  });

});

