const extractOrderId = (str) => {
    const orderIdPattern = /Order ID: (\w{3}-\w{7}-\w{7})/;
    const match = str.match(orderIdPattern);

    if (match && match[1]) {
        return match[1];
    } else {
        return 'No Order ID found';
    }
}

module.exports = extractOrderId;