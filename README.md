# bamazon

Storefront web application with Amazon-like features. Using MySQL and Sequelize, the web app will take in orders from customers
and deplete stock from the store's inventory.

The Express app is created in the `server.js` file

Database info: - MySQL Database: `bamazon` - Sequelize Model: `Product` - `Product` contains: product_name, department_name, price, stock_quantity

I've already populated the `bamazon` database with 10 different "mock" products.

Routes: -`html-routes.js` -`api-routes.js` follows RESTful principles.

Front-end functions: - displays the listing of products available to purchase and the price - customer will be able to select an item & specify the quantity, then submit order - application will check if there is sufficient inventory once the order is placed - if so, database will be updated to reflect the remaining quantity, then show total price of the order - if not `Insufficient quantity!` will display and prevent order from being placed
