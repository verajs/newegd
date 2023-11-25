const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    itemIdentifiers: [String]
}, { strict: false });
const Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;
