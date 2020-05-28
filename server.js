const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongostore", { useNewUrlParser: true });


app.get("/inventory", (req, res) => {
  db.Product.find({})
    .then(dbStore => {
      res.json(dbStore);
    })
    .catch(err => {
      res.json(err);
    });
});


//Adds a new product to the database
app.post("/product",(req,res) =>{
    db.Product.create(req.body).catch(err => res.json(err));
});

//Adds a new customer to the database
app.post("/user",(req,res) =>{
    db.Customer.create(req.body).catch(err => res.json(err));
});

app.post("/order",(req,res) =>{
    /*The query needs:
    -The id of the current product page as "productId"
    -The object of the form data for the order as "orderObject"
    -The object of the form data for the customer as "customerObject"
    */
    let productId = req.body.productId;
    orderObject = req.body.order;
    customerObject = req.body.customer;
    //These variables spilt the incoming data into the nessesary objects
    db.Product.find({_id: productId}).then(productData => {
        //We find the product being ordered by using the provided id
        if(productData.InventoryCheck(orderObject.qty))
        {
            //Inventory Check returns true and carries out the operation on product, if the order is possible
            db.Order.create(orderObject).then(orderData => {
                //This creates the order db object
                customerObject.orders.push(orderData._id);
                //customer object should have an orders array when sent here. TODO: make sure this doesn't override an existing array
                db.Customer.findOneAndUpdate({email: customerObject.email},
                    customerObject,{
                    new: true,
                    upsert: true
                    //This either updates or creates a customer object
                }).then(customerData =>
                    {
                        db.Order.findOneAndUpdate(orderData,{$push:{customer: customerData}}).then(orderData1 =>
                            {
                                //This updates the order with the found or created customer
                                res.json(orderData1);
                                //This should probably be changed to a redirect later
                            }
                        ).catch(err => res.json(err));
                    }
                ).catch(err => res.json(err));
            }).catch(err => res.json(err));
        }
        else
        {
            alert("There isn't enough of that product to place your order.");
            res.end();
        }
    });
});

// price update
//get inventory
//set price

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});