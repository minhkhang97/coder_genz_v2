const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    productId: {
        type: String,
    },
    //trong truong hop san pham do co thay doi gia ban
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    properties: {
        type: Array
    },
    create_at: {
        type: Date,
        default: Date.now,
    }
});

const OrderDetail = mongoose.model('order_detail', orderDetailSchema);
module.exports = OrderDetail;