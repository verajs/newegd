import axios from 'axios';
const API_KEY = "5f4f4968dba4cf7b4d97efa7bb0d777d"
const API_TOKEN = "ATTA5d3cf6a3576b9ac6d6e8f1f8d5c9de5bb21572c07b0897825a6844b1452b66ff77CA69C3"


export const getCardField = async (cardId, field) => {
    if (!cardId || !field) {
        throw new Error('Card ID and field are required');
    }

    const availableFields = [
        'id', 'address', 'badges', 'checkItemStates', 'closed', 'coordinates',
        'creationMethod', 'dueComplete', 'dateLastActivity', 'desc', 'descData',
        'due', 'dueReminder', 'email', 'idBoard', 'idChecklists', 'idLabels',
        'idList', 'idMembers', 'idMembersVoted', 'idShort', 'idAttachmentCover',
        'labels', 'limits', 'locationName', 'manualCoverAttachment', 'name',
        'pos', 'shortLink', 'shortUrl', 'subscribed', 'url', 'cover', 'isTemplate'
    ];

    if (!availableFields.includes(field)) {
        throw new Error(`Field "${field}" is not a valid field`);
    }

    try {
        const url = `https://api.trello.com/1/cards/${cardId}/${field}?key=${API_KEY}&token=${API_TOKEN}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data._value;
    } catch (err) {
        console.error(`Failed to fetch Trello card field "${field}":`, err);
        throw err;
    }
};

export const extractOrderId = (str) => {
    const orderIdPattern = /Order ID: (\w{3}-\w{7}-\w{7})/;
    const match = str.match(orderIdPattern);

    if (match && match[1]) {
        return match[1];
    } else {
        return 'No Order ID found';
    }
}
export const extractValues = (str) => {
    let lengthMatch = str.match(/L(\d+)/);
    let widthMatch = str.match(/W(\d+)/);
    let heightMatch = str.match(/H(\d+)/);
    let weightMatch = str.match(/OZ(\d+)/);

    let length = lengthMatch ? parseInt(lengthMatch[1], 10) : null;
    let width = widthMatch ? parseInt(widthMatch[1], 10) : null;
    let height = heightMatch ? parseInt(heightMatch[1], 10) : null;
    let weight = weightMatch ? parseInt(weightMatch[1], 10) : null;

    return { length, width, height, weight };
}

export async function makeLabelRequest(orderId, cardId, itemDetails, dimensions) {
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
                "weight": weightPerItem,
                "ItemPrice": item.ItemPrice
            }))
        };
        console.log("Request body:", requestBody);

        const response = await axios.post('http://104.197.253.79:8000/api/makelabel', requestBody);
        console.log(response.data);
    } catch (error) {
        console.error('Error making label request:', error);
    }
}


export const getCards = async (LIST_ID) => {
    try {
        const url = `https://api.trello.com/1/lists/${LIST_ID}/cards?key=${API_KEY}&token=${API_TOKEN}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const cards = await response.json();
        return cards;
    } catch (err) {
        console.error('Failed to fetch Trello cards:', err);
        throw err; // Rethrow the error if you want the caller to handle it as well
    }
};
