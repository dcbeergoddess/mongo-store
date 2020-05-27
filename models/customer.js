const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    fname: {
        type: String,
        trim: true
    },
    lname: {
        type: String,
        trim: true,
        required: "Your last name is required."
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }],
    fullName: String
});

CustomerSchema.methods.setFullName = function()
{
    this.fullName = `${this.lname}, ${this.fname}`;
    return this.fullName;
}

const Customer = mongoose.model("Customer",CustomerSchema);

module.exports = Customer;