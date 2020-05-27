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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

db.Store.create({ name: "Store" })
  .then(dbStore => {
    console.log(dbStore);
  })
  .catch(({message}) => {
    console.log(message);
  });

app.get("/inventory", (req, res) => {
  db.Item.find({})
    .then(dbStore => {
      res.json(dbStore);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populated", (req, res) => {
  db.Store.find({})
    .populate("items")
    .then(dbStore => {
      res.json(dbStore);
    })
    .catch(err => {
      res.json(err);
    });
});

// add new item
app.post("/submit", ({body}, res) => { 
  db.Item.create(body)
    .then(({_id}) => db.Store.findOneAndUpdate({}, { $push: { item: _id, price: price, qty: qty, desc: desc } }, { new: true }))
    .then(dbStore => {
      res.json(dbStore);
    })
    .catch(err => {
      res.json(err);
    });
});

// price update
//get inventory
//set price

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});