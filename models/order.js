const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*The orders collection will have these fields: 
`customer` (relationship), `product` (relationship), 
`qty` (number), `orderDate` (Date, Default to now)*/
const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    qty: {
        type: Number,
        default: 1
    },
    orderDate: {
        type: Date,
        default: Date.now()
    }
});

const Order = mongoose.model("Order",OrderSchema);

module.exports = Order;