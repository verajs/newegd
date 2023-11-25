const axios = require('axios');
async function makeLabelRequest(orderId, cardId, itemDetails, dimensions) {
    try {
        const totalQuantity = itemDetails.reduce((sum, item) => sum + item.QuantityOrdered, 0);

        // Calculate the weight per item
        const weightPerItem = dimensions.weight / totalQuantity;

        const requestBody = {
            "ORDER_ID": orderId,
            "card_id": cardId,
            "package_size": {
                "length": dimensions.length,
                "width": dimensions.width,
                "height": dimensions.height,
                "weight": dimensions.weight
            },
            "order_items": itemDetails.map(item => ({
                "itemIdentifier": item.OrderItemId,
                "quantity": item.QuantityOrdered,
                "weight": weightPerItem
            }))
        };
        console.log("Request body:", requestBody);

        const response = await axios.post('http://104.197.253.79:8000/api/makelabel', requestBody);
        console.log(response.data);
    } catch (error) {
        console.error('Error making label request:', error);
    }
}


module.exports = makeLabelRequest;