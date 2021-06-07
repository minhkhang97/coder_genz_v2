const mongoose = require('mongoose');

const customerShema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    contact: {
        fullname: String,
        phone: String,
        address: String,
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }]
});

const Customer = mongoose.model('customer', customerShema);

module.exports = Customer;