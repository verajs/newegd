// Import mongoose and set up the connection to MongoDB
import mongoose from 'mongoose';

const dbUri = "mongodb+srv://ceo:aO3jW1tWvS1wsLfB@e-graphicdesignorders.zqulinv.mongodb.net/?retryWrites=true&w=majority/test"
mongoose.connect(dbUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Order schema and model
const orderSchema = new mongoose.Schema({
    itemIdentifiers: [String]
}, { strict: false });

const Order = mongoose.model('Order', orderSchema, 'orders');

// Define the searchOrder function
export const searchOrder = async (orderId) => {
  try {
    const order = await Order.findOne({ 'data': orderId });
    return order;
  } catch (error) {
    console.error('Error searching for order:', error);
    throw error;
  }
};
