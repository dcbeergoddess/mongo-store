# Mini Project

In this activity, you will build a small online store. You'll work in groups of 3-4 and divide responsibilities.

## Instructions

* The store db will be stored in Mongo and will consist of these collections: 
`products`, 
`customers`, and 
`orders`.

* The products collection will have these fields:  

`name` (string), 
`description` (string), 
`price` (number), 
`inventory` (number)

* The customers collection will have these fields: 
`fname` (string), 
`lname` (string), 
`email` (string, unique, validated), 
`orders` (relationship)

* The orders collection will have these fields: 
`customer` (relationship), 
`product` (relationship), 
`qty` (number), 
`orderDate` (Date, Default to now)

* You'll use the Mongo command line shell to seed the database with at least 5 products

```sql

db.products.insertMany([
  { name: "Beard Growth Serum", description: "Grow your best beard during quarantine!", price: 25.99, inventory: 6 },
  { name: "Hair Dye Kit", description: "Mulit Color Pack of temporty Hair Coloring! Includes Pink, Blue, Green and Purple ", price: 45.99, inventory: 7 },
  { name: "Chia Pet: Chewbacca", description: "Grow your own Chewbacca Chia Pet at home!", price: 17.99, inventory: 3 },
  { name: "Home Brew Kit", description: "The essentials to making your own beer at home!", price: 250.00, inventory: 1 },
  { name: "Stand Up Punching Bag", description: "Get your agression out in a health way at home!", price: 199.00, inventory: 19 }
])


```

* You'll create a homepage that will display all products (with data coming from an api call). When the user clicks on a product, they go to a detail page, where they can see all details, and order the product (while also specifying a quantity). Also on this page the user will provide their name and email address for the order.

```js

// PSEUDO CODE API ROUTES

// GET ALL PRODUCTS

```

* You'll also create an orders page that will grab all orders, and in a table show the order qty, product name, customer name, and customer email address.

```js

// POPULATE ORDERS PAGE, TURN INTO FANCY TABLE (LOOK THIS UP)

```

* If inventory doesn't exceed the quantity ordered, the order should not go through and the customer should be alerted.

```js

//JavaScript for changing inventory

```

* If the customer's email already exists, the existing customer record should be used.

```js

// ADD ORDER TO CUSTOMER BY ID/EMAIL

```

* When they click submit, the customer and order data are added to the db, and the product inventory is adjusted appropriately. They should then be sent back to the home page.

```js

// on click event
// redirect to home page

```

* For simplicity, only one order at a time per customer, and only one product in that order (but qty can vary)

```js

// 1 ORDER per CUSTOMER
// 1 PRODUCT per ORDER
// QTY ordered per PRODUCT can vary

```

## 💡 Hint(s)
* Take some time to pseudocode the logic flow
* Also plan out your database and its relationships
* Also plan out the routes that will be needed, and what each should do

## 🏆 Bonus
* Use LocalStorage on the browser to remember the fname, lname, and email address used in the most recent order and pre-populate those fields when the customer goes to make a new order.
