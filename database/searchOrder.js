const Order = require('./Order'); // Path to the Order model

const searchOrder = async (orderId) => {
  try {
    const order = await Order.findOne({ 'data': orderId });
    return order;
  } catch (error) {
    console.error('Error searching for order:', error);
    throw error;
  }
};

module.exports = searchOrder;
