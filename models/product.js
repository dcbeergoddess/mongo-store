const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* The products collection will have these fields:  
`name` (string), `description` (string), 
`price` (number), `inventory` (number)*/
const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "A product must have a name."
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    inventory: {
        type: Number,
        default: 0
    }
});

//This method takes in an order number, and either returns false (if the order cannot be filled),
//or true and subtracts the desired number
Schema.methods.InventoryRequest(num)
{
    if(this.inventory < num)
    {
        return false;
    }
    else
    {
        this.inventory = this.inventory - num;
        return true;
    }
}

const Product = mongoose.model("Product",ProductSchema);
module.exports = Product;