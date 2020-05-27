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
    //Find out how to get the id of the customer object
    db.Order.create(req.body).then(({})=>{
        db.Customer.findOneAndUpdate({_id}, {
            $push: {orders: _id}
        });
    });
});

// price update
//get inventory
//set price

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});